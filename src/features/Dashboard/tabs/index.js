import ClientGeneral from "./client/ClientGeneral";
import ClientServices from "./client/ClientServices";
import ClientOrders from "./client/ClientOrders";
import ClientProfile from "./client/ClientProfile";

import AdminGeneral from "./admin/AdminGeneral";
import AdminServices from "./admin/AdminServices";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";
import AdminServiceProviders from "./admin/AdminServiceProviders";
import ServiceProviderGeneral from "./serviceProvider/ServiceProviderGeneral";
import ServiceProviderServices from "./serviceProvider/ServiceProviderServices";
import ServiceProviderFinance from "./serviceProvider/ServiceProviderFinance";
import AdminProfile from "./admin/AdminProfile";
import SPCreateService from "./serviceProvider/SPCreateService";
import CreateNewSP from "./admin/features/CreateNewSP";
import SPManageTimelines from "./serviceProvider/SPManageTimelines";
import ServiceProviderVariants from "./serviceProvider/ServiceProviderVariants";
import AdminFinance from "./admin/AdminFinance";
import SPDisputes from "./serviceProvider/SPDisputes";
import ClientDisputes from "./client/ClientDisputes";
import ClientFavorite from "./client/ClientFavorite";
import ProviderVerification from "./serviceProvider/ProviderVerification";
import AdminVerificationRequests from "./admin/AdminVerificationRequests";

import {
  LayoutDashboard,
  Users,
  Briefcase,
  ShoppingBag,
  Wallet,
  UserCircle,
  ShieldCheck,
  Heart,
  MessageSquare,
  AlertCircle,
  PlusCircle,
  Settings,
} from "lucide-react";

// ... existing component imports ...

export default {
  admin: {
    General: {
      label: "General",
      icon: LayoutDashboard,
      component: AdminGeneral,
    },
    Users: {
      label: "Users",
      icon: Users,
      component: AdminUsers,
      children: [{ label: "Create New Admin", component: AdminGeneral }],
    },
    Services: {
      label: "Service",
      icon: Briefcase,
      component: AdminServices,
    },
    Orders: {
      label: "Orders",
      icon: ShoppingBag,
      component: AdminOrders,
    },
    Finance: {
      label: "Finance",
      icon: Wallet,
      component: AdminFinance,
    },
    ServiceProvider: {
      label: "Service Providers",
      icon: Users,
      component: AdminServiceProviders,
      children: [
        { label: "Create New Service Provider", component: CreateNewSP },
      ],
    },
    Profile: {
      label: "Profile",
      icon: UserCircle,
      component: AdminProfile,
    },
  },
  super_admin: {
    General: {
      label: "General",
      icon: LayoutDashboard,
      component: AdminGeneral,
    },
    Users: {
      label: "Users",
      icon: Users,
      component: AdminUsers,
      children: [{ label: "Create New Admin", component: AdminGeneral }],
    },
    Services: {
      label: "Service",
      icon: Briefcase,
      component: AdminServices,
    },
    Orders: {
      label: "Orders",
      icon: ShoppingBag,
      component: AdminOrders,
    },
    Finance: {
      label: "Finance",
      icon: Wallet,
      component: AdminFinance,
    },
    ServiceProvider: {
      label: "Service Providers",
      icon: Users,
      component: AdminServiceProviders,
      children: [
        { label: "New Service Provider", component: CreateNewSP },
        {
          label: "Verification Requests",
          component: AdminVerificationRequests,
        },
      ],
    },
    Profile: {
      label: "Profile",
      icon: UserCircle,
      component: AdminProfile,
    },
  },
  client: {
    General: {
      label: "General",
      icon: LayoutDashboard,
      component: ClientGeneral,
    },
    Orders: {
      label: "Orders",
      icon: ShoppingBag,
      component: ClientOrders,
    },
    Favorite: {
      label: "Favorite",
      icon: Heart,
      component: ClientFavorite,
    },
    Profile: {
      label: "Profile",
      icon: UserCircle,
      component: ClientProfile,
    },
    Disputes: {
      label: "Disputes",
      icon: AlertCircle,
      component: ClientDisputes,
    },
    Messages: {
      label: "Messages",
      icon: MessageSquare,
      component: ClientOrders,
    },
  },
  service_provider_root: {
    General: {
      label: "General",
      icon: LayoutDashboard,
      component: ServiceProviderGeneral,
    },
    Services: {
      label: "Services",
      icon: Briefcase,
      component: ServiceProviderServices,
      children: [
        { label: "Manage Service", component: ServiceProviderServices },
        { label: "Manage Variants", component: ServiceProviderVariants },
        { label: "Manage Timelines", component: SPManageTimelines },
        { label: "Create New Service", component: SPCreateService },
      ],
    },
    Finance: {
      label: "Finance",
      icon: Wallet,
      component: ServiceProviderFinance,
    },
    Disputes: {
      label: "Disputes",
      icon: AlertCircle,
      component: SPDisputes,
    },
    Verification: {
      label: "Verification",
      icon: ShieldCheck,
      component: ProviderVerification,
    },
  },
};
