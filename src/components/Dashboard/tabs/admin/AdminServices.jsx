import React, { useEffect, useState } from "react";
import DynamicTable from "../../DynamicTable";
import ActionMenu from "../../ActionMenu";
import adminApis from "../../../../api/adminApis";
import { FcCheckmark } from "react-icons/fc";
import { ImCross } from "react-icons/im";

export default function AdminServices() {
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
  const approveService = async (id) => {
    const payload = {
      id: id,
      status: "approve",
    };
    const res = await adminApis.updateServiceStatus(payload);
    if (res) {
      updateRow(id, (row) => ({ ...row, approved: true, rejected: false }));
    }
  };
  const rejectService = async (id) => {
    const payload = {
      id: id,
      status: "reject",
    };
    const res = await adminApis.updateServiceStatus(payload);
    if (res) {
      updateRow(id, (row) => ({ ...row, rejected: true, approved: false }));
    }
  };
  useEffect(() => {
    (async () => {
      const res = (await adminApis.getAllServices()).data;
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
              row.approved
                ? {
                    label: "Reject",
                    onClick: async () => await rejectService(row.id),
                  }
                : {
                    label: "Approve",
                    onClick: async () => await approveService(row.id),
                  },
              {
                label: "Delete",
                danger: true,
                onClick: () => console.log("Delete", row.id),
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
