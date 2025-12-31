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
import ServiceProviderOrders from "./serviceProvider/ServiceProviderOrders";
import ServiceProviderPage from "./serviceProvider/ServiceProviderPage";
import AdminProfile from "./admin/AdminProfile";
import SPCreateService from "./serviceProvider/SPCreateService";

export default {
  admin: {
    General: AdminGeneral,
    Services: AdminServices,
    Users: AdminUsers,
    Orders: AdminOrders,
    ServiceProvider: AdminServiceProviders,
    Profile: AdminProfile,
  },
  client: {
    General: ClientGeneral,
    Services: ClientServices,
    Profile: ClientProfile,
    Orders: ClientOrders,
  },
  service_provider_root: {
    General: ServiceProviderGeneral,
    Services: ServiceProviderServices,
    CreateService: SPCreateService,
    Orders: ServiceProviderOrders,
    Page: ServiceProviderPage,
  },
};
