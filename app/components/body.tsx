import React from "react";
import TaskData from "./taskData";
import TextArea from "./textArea";
import Footer from "./footer";
import Divider from "./divider";

export default function Body() {
  return (
    <div className="col-start-2 col-span-2 flex flex-col gap-4 text-left">
      <TaskData />
      <TextArea />
      <Divider />
      <Footer />
    </div>
  );
}
