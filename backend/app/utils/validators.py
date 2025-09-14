from functools import wraps
from flask import request, jsonify
import re
from typing import Dict, Any, List, Optional

class ValidationError(Exception):
    """Exceção customizada para erros de validação"""
    def __init__(self, message: str, field: str = None):
        self.message = message
        self.field = field
        super().__init__(self.message)

class Validator:
    """Classe para validações de dados"""
    
    @staticmethod
    def validate_email(email: str) -> bool:
        """Valida formato de email"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    @staticmethod
    def validate_phone(phone: str) -> bool:
        """Valida formato de telefone brasileiro"""
        # Remove caracteres não numéricos
        clean_phone = re.sub(r'\D', '', phone)
        # Verifica se tem 10 ou 11 dígitos
        return len(clean_phone) in [10, 11] and clean_phone.isdigit()
    
    @staticmethod
    def validate_cpf(cpf: str) -> bool:
        """Valida CPF brasileiro"""
        # Remove caracteres não numéricos
        cpf = re.sub(r'\D', '', cpf)
        
        # Verifica se tem 11 dígitos
        if len(cpf) != 11:
            return False
        
        # Verifica se todos os dígitos são iguais
        if cpf == cpf[0] * 11:
            return False
        
        # Validação dos dígitos verificadores
        def calculate_digit(cpf_digits, weights):
            total = sum(int(digit) * weight for digit, weight in zip(cpf_digits, weights))
            remainder = total % 11
            return 0 if remainder < 2 else 11 - remainder
        
        # Primeiro dígito verificador
        first_digit = calculate_digit(cpf[:9], range(10, 1, -1))
        if int(cpf[9]) != first_digit:
            return False
        
        # Segundo dígito verificador
        second_digit = calculate_digit(cpf[:10], range(11, 1, -1))
        if int(cpf[10]) != second_digit:
            return False
        
        return True
    
    @staticmethod
    def validate_required_fields(data: Dict[str, Any], required_fields: List[str]) -> List[str]:
        """Valida se todos os campos obrigatórios estão presentes"""
        missing_fields = []
        for field in required_fields:
            if field not in data or data[field] is None or str(data[field]).strip() == '':
                missing_fields.append(field)
        return missing_fields
    
    @staticmethod
    def validate_string_length(value: str, min_length: int = 0, max_length: int = None) -> bool:
        """Valida comprimento de string"""
        if not isinstance(value, str):
            return False
        length = len(value.strip())
        if length < min_length:
            return False
        if max_length and length > max_length:
            return False
        return True
    
    @staticmethod
    def validate_business_segment(segment: str) -> bool:
        """Valida segmento de negócio"""
        valid_segments = [
            'tecnologia', 'saude', 'educacao', 'financeiro', 'varejo',
            'industria', 'servicos', 'consultoria', 'marketing', 'outros'
        ]
        return segment.lower() in valid_segments

def validate_json_data(schema: Dict[str, Dict[str, Any]]):
    """Decorator para validar dados JSON de entrada"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            try:
                data = request.get_json()
                if not data:
                    return jsonify({'error': 'Dados JSON são obrigatórios'}), 400
                
                errors = []
                
                # Validar campos obrigatórios
                required_fields = [field for field, rules in schema.items() 
                                 if rules.get('required', False)]
                missing_fields = Validator.validate_required_fields(data, required_fields)
                if missing_fields:
                    errors.append(f"Campos obrigatórios ausentes: {', '.join(missing_fields)}")
                
                # Validar cada campo
                for field, rules in schema.items():
                    if field in data:
                        value = data[field]
                        
                        # Validar tipo
                        if 'type' in rules:
                            expected_type = rules['type']
                            if expected_type == 'string' and not isinstance(value, str):
                                errors.append(f"Campo '{field}' deve ser uma string")
                            elif expected_type == 'email' and not Validator.validate_email(value):
                                errors.append(f"Campo '{field}' deve ser um email válido")
                            elif expected_type == 'phone' and not Validator.validate_phone(value):
                                errors.append(f"Campo '{field}' deve ser um telefone válido")
                            elif expected_type == 'cpf' and not Validator.validate_cpf(value):
                                errors.append(f"Campo '{field}' deve ser um CPF válido")
                        
                        # Validar comprimento
                        if 'min_length' in rules or 'max_length' in rules:
                            min_len = rules.get('min_length', 0)
                            max_len = rules.get('max_length')
                            if not Validator.validate_string_length(value, min_len, max_len):
                                errors.append(f"Campo '{field}' deve ter entre {min_len} e {max_len or 'infinitos'} caracteres")
                        
                        # Validar valores permitidos
                        if 'allowed_values' in rules:
                            if value not in rules['allowed_values']:
                                errors.append(f"Campo '{field}' deve ser um dos valores: {', '.join(rules['allowed_values'])}")
                
                if errors:
                    return jsonify({'error': 'Dados inválidos', 'details': errors}), 400
                
                return f(*args, **kwargs)
            
            except Exception as e:
                return jsonify({'error': 'Erro na validação dos dados', 'details': str(e)}), 400
        
        return decorated_function
    return decorator

def validate_query_params(params_schema: Dict[str, Dict[str, Any]]):
    """Decorator para validar parâmetros de query"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            try:
                errors = []
                
                for param, rules in params_schema.items():
                    value = request.args.get(param)
                    
                    # Verificar se é obrigatório
                    if rules.get('required', False) and not value:
                        errors.append(f"Parâmetro '{param}' é obrigatório")
                        continue
                    
                    if value:
                        # Validar tipo
                        if rules.get('type') == 'int':
                            try:
                                int(value)
                            except ValueError:
                                errors.append(f"Parâmetro '{param}' deve ser um número inteiro")
                        
                        # Validar valores permitidos
                        if 'allowed_values' in rules:
                            if value not in rules['allowed_values']:
                                errors.append(f"Parâmetro '{param}' deve ser um dos valores: {', '.join(rules['allowed_values'])}")
                
                if errors:
                    return jsonify({'error': 'Parâmetros inválidos', 'details': errors}), 400
                
                return f(*args, **kwargs)
            
            except Exception as e:
                return jsonify({'error': 'Erro na validação dos parâmetros', 'details': str(e)}), 400
        
        return decorated_function
    return decorator