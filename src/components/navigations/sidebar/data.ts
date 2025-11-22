import {
  Home,
  BookOpen,
  FileText,
  Brain,
  Settings,
  Shield,
  Users,
  Box,
} from "lucide-react";

export const navItemsByRole: Record<string, any[]> = {
  student: [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "My Notes", href: "/dashboard/my-notes" },
    { icon: Brain, label: "Quizzes", href: "/dashboard/quizzes" },
  ],

  teacher: [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: FileText, label: "Subjects", href: "/dashboard/subjects" },
    { icon: Users, label: "Manage Students", href: "/dashboard/manage-students" },
    { icon: Brain, label: "Create Quizzes", href: "/dashboard/quizzes/create" },
  ],

  admin: [
    { icon: Home, label: "Admin Panel", href: "/dashboard/admin/overview" },
    { icon: Box, label: "Metrics", href: "/dashboard/admin/metrics" },
    { icon: Users, label: "Users", href: "/dashboard/admin/users" },
    { icon: Shield, label: "Roles & Permissions", href: "/dashboard/admin/role-permissions" },
    { icon: Settings, label: "System Settings", href: "/dashboard/admin/settings" },
  ],
};
