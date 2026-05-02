"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
// import {
//   IRecentOrdersResponse,
//   ITopSellingProductsResponse,
//   statusColors,
//   statusPtBr,
// } from "@/models/Dashboard.Model";
// import { IndexDashboard } from "@/services/Dashboard";
import { Package, ShoppingCart, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminDashboard() {
  //   const [recentOrders, setRecentOrders] = useState<IRecentOrdersResponse[]>([]);
  //   const [topSellingProducts, setTopSellingProducts] = useState<
  //     ITopSellingProductsResponse[]
  //   >([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [failures, setFailures] = useState(0);
  const [success, setSuccess] = useState(0);
  const [loading, setLoading] = useState(true);

  //   const fetchDashboard = async () => {
  //     try {
  //       const res = await IndexDashboard();
  //       setTotalOrders(res.totalOrders);
  //       setFailures(res.failures);
  //       setSuccess(res.success);
  //       setRecentOrders(res.recentOrders);
  //       setTopSellingProducts(res.topSellingProducts);
  //     } catch (error) {
  //       toast.error("Erro ao buscar dados do dashboard");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchDashboard();
  //   }, []);

  const stats = [
    {
      title: "Total de Pedidos",
      value: totalOrders,
      description: "Todos os pedidos",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Falhas",
      value: failures,
      description: "Pedidos cancelados",
      icon: TrendingUp,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Sucessos",
      value: success,
      description: "Pedidos concluídos",
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do seu negócio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading
          ? [1, 2, 3].map((i) => (
              <Card key={i} className="p-4 space-y-3">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-3 w-1/4" />
              </Card>
            ))
          : stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-full ${stat.bgColor}`}>
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>Últimos pedidos realizados</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <div className="space-y-4">
              {loading
                ? [1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20 mt-1" />
                      </div>
                      <div className="text-right">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-5 w-16 mt-1 rounded-full" />
                      </div>
                    </div>
                  ))
                : recentOrders.map((pedido, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {pedido.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {pedido.product}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {pedido.amount}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full
                           ${statusColors[pedido.status]}`}
                        >
                          {statusPtBr[pedido.status]}
                        </span>
                      </div>
                    </div>
                  ))}
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
            <CardDescription>Top 5 plantas mais populares</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <div className="space-y-4">
              {loading
                ? [1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between space-x-3"
                    >
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))
                : topSellingProducts.map((produto, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm font-medium text-olive-700 mr-4">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          {produto.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {Number(produto.quantity) > 1
                            ? `${produto.quantity} vendas`
                            : `${produto.quantity} venda`}
                        </p>
                      </div>
                    </div>
                  ))}
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
