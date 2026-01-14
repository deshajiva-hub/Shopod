"use client";

import { useState } from "react";
import HeroSlider from "@/components/Banner/HeroSlider";
import AllCategories from "@/components/Category/AllCategories";
import FoodCategorySlider from "@/components/Food/FoodCategorySlider";
import BenefitBar from "@/components/Features/BenefitBar";
import Modal from "@/components/Modal";

export default function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* 🔥 Pass callback */}
      <HeroSlider onShopNowClick={() => setOpen(true)} />

      <AllCategories />
      <FoodCategorySlider />
      <BenefitBar />

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Shopod Offer"
        position="center"
        size="md"
      >
        <p className="text-gray-700">
          Welcome to Shopod 🎉
        </p>
      </Modal>
    </div>
  );
}
