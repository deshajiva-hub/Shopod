import { Tag, CheckCircle, RotateCcw, Box } from "lucide-react";

export default function BenefitBar() {
    const benefits = [
        {
            icon: <Tag className="text-green-500" size={32} />,
            title: "Best prices & offers",
            subtitle: "Orders $50 or more",
            bg: "bg-green-50",
        },
        {
            icon: <CheckCircle className="text-yellow-500" size={32} />,
            title: "Best prices & offers",
            subtitle: "24/7 amazing services",
            bg: "bg-yellow-50",
        },
        {
            icon: <Tag className="text-orange-500" size={32} />,
            title: "Best prices & offers",
            subtitle: "When you sign up",
            bg: "bg-orange-50",
        },
        {
            icon: <Box className="text-blue-500" size={32} />,
            title: "Wide assortment",
            subtitle: "Mega Discount",
            bg: "bg-blue-50",
        },
        {
            icon: <RotateCcw className="text-red-500" size={32} />,
            title: "Easy returns",
            subtitle: "Within 30 days",
            bg: "bg-red-50",
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {benefits.map((benefit, i) => (
                    <div
                        key={i}
                        className={`flex items-center gap-4 ${benefit.bg} p-4 rounded-xl border border-gray-100 hover:shadow-md transition`}
                    >
                        <div className="flex-shrink-0">{benefit.icon}</div>
                        <div>
                            <h4 className="font-bold text-sm text-gray-800">{benefit.title}</h4>
                            <p className="text-xs text-gray-500">{benefit.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
