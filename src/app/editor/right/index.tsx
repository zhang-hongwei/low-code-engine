import { useEditorStore } from "@/store/editor";
import { GridItemPropsPanel } from "./pannel/GridItemPropsPanel";

const Center = () => {
    const activeId = useEditorStore(state => state.activeId);
    const nodeMap = useEditorStore(state => state.componentTree.nodeMap);

    const node = activeId ? nodeMap[activeId] : null;

    if (!node) return <div className="p-4 text-gray-400">未选中组件</div>;

    const handleChange = (key: string, value: any) => {
        // setComponentProps(node.id, {
        //     ...node.props,
        //     [key]: value,
        // });
    };



    return (
        <div className="p-4 border-l w-[300px] bg-white">

            <GridItemPropsPanel />
        </div>
    );
}
export default Center;