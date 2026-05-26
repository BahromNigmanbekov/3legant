import { Truck, RefreshCw, Lock, Headphones } from "lucide-react";
import { useTranslation } from "react-i18next";



function Info() {

  const { t } = useTranslation();
  const features = [
  {
    icon: Truck,
    title: t("free_shipping"),
    description: t("order_above_200"),
  },
  {
    icon: RefreshCw,
    title: t("money_back"),
    description: t("guarantee_30_days"),
  },
  {
    icon: Lock,
    title: t("secure_payments"),
    description: t("secured_by_stripe"),
  },
  {
    icon: Headphones,
    title: t("support_247"),
    description: t("phone_email_support"),
  },
];
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col gap-3 bg-gray-100 rounded-sm px-6 py-8"
          >
            <Icon strokeWidth={1.5} className="w-7 h-7 text-gray-800" />
            <div>
              <p className="text-sm font-semibold text-gray-900">{title}</p>
              <p className="text-sm text-gray-500 mt-0.5">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Info;