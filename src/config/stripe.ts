export type PlanType = {
  priceId: string;
  price: number;
  isFreePlan?: boolean;

  name: string;
  description: string;
  features: string[];

  highlighted?: boolean;
};

const isDevelopment = process.env.NODE_ENV === "development";

const stripeConfig = {
  plans: [
    {
      priceId: "",
      price: 0,
      isFreePlan: true,

      name: "Free",
      description: "Great for beginners exploring Cogniba.",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      priceId: isDevelopment
        ? "price_1Qnd87RprLy2N53jYmRQE4DC"
        : "price_1QndAKRprLy2N53jEjWArTKJ",
      price: 20,

      name: "Pro",
      description: "For serious users aiming for top results.",
      features: ["Feature 1", "Feature 2", "Feature 3"],

      highlighted: true,
    },
  ] satisfies PlanType[],
};

export default stripeConfig;
