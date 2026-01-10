import React, { useEffect, useState } from "react";
import DynamicTable from "../../DynamicTable";
import ActionMenu from "../../ActionMenu";
import { FcCheckmark } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import serviceProviderApis from "../../../../api/serviceProviderApis";

export default function ServiceProviderServices() {
  const [data, setData] = useState(null);

  const updateRow = (id, updater) => {
    setData((prev) => {
      if (!prev) return prev;
      const newData = prev.data.map((row) =>
        row.id === id ? { ...row, ...updater(row) } : row
      );
      return { ...prev, data: newData };
    });
  };

  const openNewTab = (id) => {
    window.open(`/service/${id}`, "_blank");
  };

  const publishService = async (serviceId) => {
    const res = await serviceProviderApis.publishService(serviceId);
    if (res) {
      updateRow(serviceId, (row) => ({
        ...row,
        published: true,
      }));
    }
  };

  const unpublishService = async (serviceId) => {
    const res = await serviceProviderApis.unpublishService(serviceId);
    if (res) {
      updateRow(serviceId, (row) => ({
        ...row,
        published: false,
      }));
    }
  };

  useEffect(() => {
    (async () => {
      const res = (await serviceProviderApis.getAllServices()).data;
      if (!res.length) return;
      const columns = Object.keys(res[0])
        .filter((key) => key !== "serviceProviderId" && key !== "description")
        .map((key) => ({
          key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          render: (row) =>
            typeof row[key] == "boolean" ? (
              row[key] == true ? (
                <div className="flex items-center justify-center">
                  <FcCheckmark size={"24px"} />
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <ImCross />
                </div>
              )
            ) : (
              row[key]
            ),
          sortable: true,
        }));

      columns.push({
        key: "Actions",
        label: "",
        render: (row) => (
          <ActionMenu
            actions={[
              {
                label: "View",
                onClick: () => openNewTab(row.id),
              },
              row.published
                ? {
                    label: "Unpublish",
                    onClick: async () => await unpublishService(row.id),
                  }
                : {
                    label: "Publish",
                    onClick: async () => await publishService(row.id),
                  },
            ]}
          />
        ),
      });

      setData({ columns, data: res });
    })();
  }, []);

  return (
    <div>
      <h1 className="text-3xl antialiased mb-4">Services</h1>
      {data ? (
        <DynamicTable columns={data.columns} data={data.data} />
      ) : (
        "Loading..."
      )}
    </div>
  );
}
