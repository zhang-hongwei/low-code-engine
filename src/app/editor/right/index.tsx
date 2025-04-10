import { useEditorStore } from "@/store/editor";
import { GridItemPropsPanel } from "./pannel/GridItemPropsPanel";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const labelData = [
    { label: '弹性布局(flex)', value: 'flex' },
    { label: '栅格布局(grid)', value: 'grid' },
];

const Center = () => {
    const activeId = useEditorStore(state => state.activeId);
    const nodeMap = useEditorStore(state => state.componentTree.nodeMap);
    const updateNodeProps = useEditorStore(state => state.updateNodeProps);

    const node = activeId ? nodeMap[activeId] : null;

    if (!node) return <div className="p-4 text-gray-400">未选中组件</div>;

    const handleChange = (event: any, item: any) => {
        console.log(event, item.value)
        if (!activeId) return;
        updateNodeProps(activeId, {
            style: {

                'display': item.value,
            },
        });
    };



    return (
        <div className="p-4 border-l w-[300px] bg-white">
            <Autocomplete
                disablePortal
                options={labelData}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="布局方式" />}
                onChange={handleChange}
            />
            <GridItemPropsPanel />
        </div>
    );
}
export default Center;