import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../lib/axios";

export default function ClusterList() {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    api.get("/api/clustersresult")
      .then(res => setClusters(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Data Cluster Pelanggan</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Nama Pelanggan</th>
            <th>Cluster</th>
          </tr>
        </thead>
        <tbody>
          {clusters.map((item, index) => (
            <tr key={index}>
              <td>{item.customer?.name ?? "-"}</td>
              <td>Cluster {item.cluster}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
