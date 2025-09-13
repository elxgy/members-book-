// Central type definitions for the Members Book application

export type UserType = "admin" | "member" | "guest";
export type MemberHierarchy = "socios" | "infinity" | "disruption";
export type UserStatus = "active" | "pending" | "suspended";
export type FilterType = "all" | "socios" | "infinity" | "disruption";
export type StatusFilterType = "all" | "active" | "pending" | "suspended";
export type TrendType = "up" | "down" | "stable";
export type SettingType = "toggle" | "navigation" | "action";

// Base User interface
export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  memberHierarchy: MemberHierarchy;
  profileImage?: string;
  joinDate?: Date;
  lastActive?: Date;
}

// Member interface for showcase and member list
export interface Member {
  id: string;
  name: string;
  company: string;
  sector: string;
  hierarchy: MemberHierarchy;
  photo?: string;
  bio?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  instagram?: string;
  website?: string;
  // Additional properties for showcase
  title?: string;
  expertise?: string[];
  connections?: number;
  isOnline?: boolean;
  avatar?: string;
}

// Admin-specific user interface
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  tier: MemberHierarchy;
  status: UserStatus;
  joinDate: Date;
  lastActive: Date;
  eventsAttended: number;
  connections: number;
}

// Chat-related interfaces
export interface ChatMessage {
  id: string;
  text: string;
  content?: string;
  timestamp: Date;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  isOwn: boolean;
  type: 'text' | 'system';
  status?: 'sent' | 'delivered' | 'read';
}

export interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  participants: number;
  participantCount?: number;
  isActive: boolean;
  avatar?: string;
  isOnline?: boolean;
  type?: 'direct' | 'group';
}

export interface ChatConversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  participants: User[];
}

// Settings interfaces
export interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string; // Using string instead of keyof typeof Ionicons.glyphMap for flexibility
  type: SettingType;
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

export interface SettingsGroup {
  id: string;
  title: string;
  settings: SettingItem[];
}

// Admin dashboard interfaces
export interface SystemMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: TrendType;
  icon: string;
}

export interface AdminAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  onPress: () => void;
}

// Navigation types
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Settings: undefined;
  MemberProfile: { memberId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Showcase: undefined;
  Chat: undefined;
  Profile: undefined;
  Admin: undefined;
};

// Component prop interfaces
export interface ProfileHeaderProps {
  userName: string;
  onEditPress: () => void;
}

export interface ProfileCardProps {
  user: User;
  profileImageUri: string;
  onEditPress: () => void;
}

export interface StatsCardProps {
  title?: string;
  stats?: Array<{
    icon: string;
    value: string;
    label: string;
  }>;
}

export interface SettingsSectionProps {
  title?: string;
  settings: SettingItem[];
}

export interface HierarchyBadgeProps {
  hierarchy: MemberHierarchy;
  size?: 'small' | 'medium' | 'large';
}

export interface UserTypeGuardProps {
  allowedTypes: UserType[];
  children: React.ReactNode;
  fallbackMessage?: string;
  showUpgrade?: boolean;
}

// API response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Error interfaces
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Form interfaces
export interface LoginFormData {
  email: string;
  password: string;
}

export interface ProfileFormData {
  name: string;
  email: string;
  bio?: string;
  phone?: string;
  linkedin?: string;
  instagram?: string;
  website?: string;
}

// Event interfaces
export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  attendees: User[];
  maxAttendees?: number;
  isPublic: boolean;
  createdBy: string;
  tags: string[];
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  registrationDate: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
}