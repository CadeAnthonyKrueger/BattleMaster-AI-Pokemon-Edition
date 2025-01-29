import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./styles/DragAndDropTestPage.scss";

const DragAndDropTestPage = () => {
  // const [colors, setColors] = useState([
  //   "red",
  //   "blue",
  //   "green",
  //   "yellow",
  //   "orange",
  // ]);

  // const handleDragEnd = ({ active, over }: any) => {
  //   if (!over || active.id === over.id) return;

  //   const oldIndex = colors.indexOf(active.id);
  //   const newIndex = colors.indexOf(over.id);

  //   setColors((prevColors) => arrayMove(prevColors, oldIndex, newIndex));
  // };

  // console.log('render')

  return (
    // <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="DragAndDropTestPage">
          <div className="HPbarContainer">
            <div className="HPLabel">HP</div>
            <div className="HPBarU"></div>
            <div className="HPBarUnder">
              <div className="HPBar"></div>
            </div>
          </div>
            {/* <div className="DndGridArea">
                <div className="DndGrid">
                    {[0, 1, 2, 3, 4, 5].map(() => (
                        <div style={{ backgroundColor: 'white' }}/>
                    ))}
                </div>
                <SortableContext items={colors}>
                    <div className="DndGrid">
                        {colors.map((color) => (
                            <SortableGridSlot key={color} id={color} color={color} />
                        ))}
                    </div>
                </SortableContext>
            </div> */}
        </div>
    //{/* </DndContext> */}
  );
};

const SortableGridSlot = ({ id, color }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  return (
    <div
      className="GridSlot"
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: color,
      }}
      {...attributes}
      {...listeners}
    />
  );
};

export default DragAndDropTestPage;
