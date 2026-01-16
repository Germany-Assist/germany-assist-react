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
import ServiceProviderPage from "./serviceProvider/ServiceProviderPage";
import AdminProfile from "./admin/AdminProfile";
import SPCreateService from "./serviceProvider/SPCreateService";
import CreateNewSP from "./serviceProvider/components/CreateNewSP";
import { FiMessageCircle } from "react-icons/fi";
import SPManageTimelines from "./serviceProvider/SPManageTimelines";

export default {
  admin: {
    General: {
      label: "General",
      component: AdminGeneral,
    },
    Users: {
      label: "Users",
      component: AdminUsers,
      children: [{ label: "Create New Admin", component: AdminGeneral }],
    },
    Services: {
      label: "Service",
      component: AdminServices,
    },
    Orders: {
      label: "Orders",
      component: AdminOrders,
    },
    ServiceProvider: {
      label: "Service Providers",
      component: AdminServiceProviders,
      children: [
        { label: "Create New Service Provider", component: CreateNewSP },
      ],
    },
    Profile: {
      label: "Profile",
      component: AdminProfile,
    },
  },
  super_admin: {
    General: {
      label: "General",
      component: AdminGeneral,
    },
    Users: {
      label: "Users",
      component: AdminUsers,
      children: [{ label: "Create New Admin", component: AdminGeneral }],
    },
    Services: {
      label: "Service",
      component: AdminServices,
    },
    Orders: {
      label: "Orders",
      component: AdminOrders,
    },
    ServiceProvider: {
      label: "Service Providers",
      component: AdminServiceProviders,
      children: [
        { label: "Create New Service Provider", component: CreateNewSP },
      ],
    },
    Profile: {
      label: "Profile",
      component: AdminProfile,
    },
  },
  client: {
    General: {
      label: "General",
      component: ClientGeneral,
    },
    Favorite: {
      label: "Services",
      component: ClientServices,
    },
    Profile: {
      label: "Profile",
      component: ClientProfile,
    },
    Orders: {
      label: "Orders",
      component: ClientOrders,
    },
    Messages: {
      label: "Messages",
      component: ClientOrders,
    },
  },
  service_provider_root: {
    General: {
      label: "General",
      component: ServiceProviderGeneral,
    },
    Services: {
      label: "Services",
      component: ServiceProviderServices,
      children: [
        { label: "Manage One Time Orders", component: SPManageTimelines },
        { label: "Manage Timelines", component: SPManageTimelines },
        { label: "Manage Service", component: SPCreateService },
        { label: "Create New Service", component: SPCreateService },
      ],
    },
    Finance: {
      label: "Finance",
      component: ServiceProviderFinance,
    },
    Page: {
      label: "Page",
      component: ServiceProviderPage,
    },
  },
};
