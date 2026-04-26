import React, { useEffect, useState } from "react";
import adminApis from "../../../../api/adminApis";
import DynamicTable from "../../DynamicTable";
import ActionMenu from "../../ActionMenu";
import { FcCheckmark } from "react-icons/fc";
import { ImCross } from "react-icons/im";
export default function AdminOrders() {
  const openNewTab = (url) => {
    window.open(url, "_blank");
  };
  const [data, setData] = useState(null);
 useEffect(() => {
  const fetchOrders = async () => {
    const res = await adminApis.getAllOrders();
    if (res && res.length > 0) {
      // بناء الأعمدة فقط إذا وجدت بيانات
      const dynamicColumns = Object.keys(res[0]).map(key => ({
        header: key.toUpperCase(),
        key: key,
        render: (row) => row[key]?.toString() 
      }));
      setData({ columns: dynamicColumns, data: res });
    } else {
      setData({ columns: [], data: [] }); // تجنب الـ Loading اللانهائي
    }
  };
  fetchOrders();
}, []);

  return (
    <div>
      <h1 className="text-3xl antialiased mb-4">Orders</h1>
      {data ? (
        <DynamicTable columns={data.columns} data={data.data} />
      ) : (
        "Loading..."
      )}
    </div>
  );
}
