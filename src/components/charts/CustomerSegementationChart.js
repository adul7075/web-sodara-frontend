'use client'

const CustomerSegmentationChart = ({ data }) => {
    return (
        <div className="bg-white shadow rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">
                Visualisasi Cluster (PCA)
            </h3>

            <pre className="text-xs bg-gray-100 p-4 rounded">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    )
}

export default CustomerSegmentationChart
