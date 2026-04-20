import {
  AnimatePresence,
  motion,
  Reorder,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import React, { useState, useRef } from "react";
import Card from "./Card";

// Sample card data
const sampleCards: any[] = [
  {
    id: "1",
    icon: "🏃‍♂️",
    title: "Steps",
    rank: "Rank A",
    rankVariant: "orange" as const,
    data: [
      { label: "Step count", value: "8,500", unit: "steps" },
      { label: "Distance", value: "6.2", unit: "km" },
    ],
  },
  {
    id: "2",
    icon: "🔥",
    title: "Floors",
    rank: "Rank B",
    rankVariant: "red" as const,
    data: [
      { label: "Climbed", value: "15", unit: "floors" },
      { label: "Descended", value: "12", unit: "floors" },
    ],
  },
  {
    id: "3",
    icon: "⏱️",
    title: "Intensity Minutes",
    rank: "Rank C",
    rankVariant: "purple" as const,
    data: [
      { label: "Moderate", value: "180", unit: "min" },
      { label: "Vigorous", value: "45", unit: "min" },
    ],
  },
  {
    id: "4",
    icon: "💧",
    title: "Hydration",
    rank: "Rank A",
    rankVariant: "orange" as const,
    data: [
      { label: "Water", value: "2.5", unit: "L" },
      { label: "Goal", value: "2.0", unit: "L" },
    ],
  },
];

const initialItems = sampleCards;

export const Item = ({
  item,
  onDragStart,
  onDragEnd,
}: {
  item: any;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}) => {
  const y = useMotionValue(0);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      id={item.id}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      }}
      whileDrag={{
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="mb-4 select-none"
      dragListener={false}
      dragControls={dragControls}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card {...item} isDragging={true} dragControls={dragControls} />
      </motion.div>
    </Reorder.Item>
  );
};

export const SortableCardExample: React.FC = () => {
  const [items, setItems] = useState(initialItems);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Ref để lưu trữ order ban đầu trước khi drag
  const originalOrderRef = useRef<any[]>([]);
  const hasOrderChangedRef = useRef(false);

  // Hàm cập nhật UI ngay lập tức khi kéo thả (không gọi API)
  const handleReorder = (newOrder: any[]) => {
    // Chỉ cập nhật UI local, không gọi API
    setItems(newOrder);

    // Kiểm tra xem order có thay đổi không
    const hasChanged = newOrder.some(
      (item, index) => originalOrderRef.current[index]?.id !== item.id
    );
    hasOrderChangedRef.current = hasChanged;

    console.log("UI updated during drag, order changed:", hasChanged);
  };

  // Xử lý khi bắt đầu drag
  const handleDragStart = () => {
    setIsDragging(true);
    // Lưu trữ order hiện tại
    originalOrderRef.current = [...items];
    hasOrderChangedRef.current = false;
    console.log("Drag started, saved original order");
  };

  // Xử lý khi kết thúc drag
  const handleDragEnd = async () => {
    setIsDragging(false);
    console.log("Drag ended, order changed:", hasOrderChangedRef.current);

    // Chỉ gọi API nếu order thực sự thay đổi
    if (hasOrderChangedRef.current) {
      await updatePositionsAPI();
    }
  };

  // Hàm gọi API để cập nhật vị trí
  const updatePositionsAPI = async () => {
    try {
      setIsUpdating(true);

      // Tạo array chứa thông tin vị trí mới
      const newPositions = items.map((item, index) => ({
        id: item.id,
        position: index + 1,
        title: item.title,
      }));

      console.log("Calling API to update positions:", newPositions);

      // Gửi API để cập nhật vị trí
      const response = await updateCardPositions(newPositions);

      if (
        response &&
        typeof response === "object" &&
        "success" in response &&
        response.success
      ) {
        console.log("Positions updated successfully via API");
        // Cập nhật originalOrderRef để reflect trạng thái mới
        originalOrderRef.current = [...items];
      } else {
        console.error("Failed to update positions");
        // Revert về vị trí cũ nếu API thất bại
        setItems([...originalOrderRef.current]);
        throw new Error("API call failed");
      }
    } catch (error) {
      console.error("Error updating positions:", error);
      // Revert về vị trí cũ nếu có lỗi
      setItems([...originalOrderRef.current]);
    } finally {
      setIsUpdating(false);
    }
  };

  // Hàm fake API để cập nhật vị trí
  const updateCardPositions = async (
    positions: Array<{ id: string; position: number; title: string }>
  ): Promise<{ success: boolean; message: string; positions: any[] }> => {
    // Fake API call - simulate network delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Fake API: Updating positions:", positions);

        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve({
            success: true,
            message: "Positions updated successfully",
            positions: positions,
          });
        } else {
          reject(new Error("Simulated API error"));
        }
      }, 1000); // 1 second delay to simulate API call
    });
  };

  // Hàm fake refresh items từ API
  const refreshItemsFromAPI = async () => {
    try {
      setIsUpdating(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Reset về vị trí ban đầu
      setItems([...initialItems]);
      originalOrderRef.current = [...initialItems];
      console.log("Items refreshed from fake API - reset to original order");
    } catch (error) {
      console.error("Error refreshing items:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Sortable Cards Example (API on Drag End)
      </h2>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-gray-600">
            Drag and drop cards to reorder them. API is called only when drag
            ends.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span
              className={`font-medium ${isDragging ? "text-blue-600" : "text-gray-400"}`}
            >
              {isDragging ? "🔄 Dragging..." : "✋ Ready"}
            </span>
            <span
              className={`font-medium ${isUpdating ? "text-orange-600" : "text-gray-400"}`}
            >
              {isUpdating ? "📡 Updating API..." : "💾 Saved"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isUpdating && (
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
              Updating API...
            </div>
          )}
          <button
            onClick={refreshItemsFromAPI}
            disabled={isUpdating || isDragging}
            className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 disabled:opacity-50"
          >
            Refresh
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
        className="select-none"
      >
        <Reorder.Group
          axis="y"
          onReorder={handleReorder}
          values={items}
          className="space-y-4"
        >
          <AnimatePresence>
            {items.map(item => (
              <Item
                key={item.id}
                item={item}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            ))}
          </AnimatePresence>
        </Reorder.Group>
      </motion.div>

      <motion.div
        className="mt-8 rounded-lg bg-gray-50 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="mb-2 font-semibold text-gray-900">Current Order:</h3>
        <div className="text-sm text-gray-600">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="py-1"
            >
              {index + 1}. {item.title}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Debug Info */}
      <motion.div
        className="mt-4 rounded-lg bg-blue-50 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="mb-2 font-semibold text-blue-900">Debug Info:</h3>
        <div className="text-sm text-blue-700">
          <div>Is Dragging: {isDragging ? "Yes" : "No"}</div>
          <div>Is Updating API: {isUpdating ? "Yes" : "No"}</div>
          <div>Order Changed: {hasOrderChangedRef.current ? "Yes" : "No"}</div>
        </div>
      </motion.div>
    </div>
  );
};
