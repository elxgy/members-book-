from backend.app.utils.database import forms_collection
from backend.app.models.form import Form
from bson import ObjectId

def create_form(data):
    new_form = Form(
        name=data['name'],
        description=data['description'],
        fields=data['fields'],
        created_by=data['created_by']
    )
    result = forms_collection.insert_one(new_form.dict(by_alias=True))
    return {"message": "Form created successfully", "form_id": str(result.inserted_id)}

def get_all_forms():
    forms = forms_collection.find()
    return [{**form, '_id': str(form['_id'])} for form in forms]

def get_form_by_id(form_id):
    form = forms_collection.find_one({"_id": ObjectId(form_id)})
    if form:
        form['_id'] = str(form['_id'])
    return form
