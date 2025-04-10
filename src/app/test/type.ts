// 添加类型定义以避免 "any" 类型问题
export interface View {
    pageData: {
        _id: string;
        title: string;
        type?: string;
    };
    sectionData: Array<{
        _id: string;
        content: Array<{ widgets: Array<string> }>;
    }>;
    widgetData: Array<{
        _id: string;
        fields: string[];
    }>;
    fieldDefinitions: Array<{
        _id: string;
        label: { value: string };
    }>;
}

export interface IdTypes {
    [key: string]: {
        type: string;
        container: string;
        name: string;
        extraInfo?: string;
    };
}

export interface IdArrays {
    [key: string]: string[];
}
