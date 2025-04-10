'use client'

import React, { useState, useMemo } from 'react';
import './index.scss';

export default function GridEditor() {
    const [columngap, setColumngap] = useState(10);
    const [rowgap, setRowgap] = useState(10);
    const [columns, setColumns] = useState(5);
    const [rows, setRows] = useState(5);
    const [colArr, setColArr] = useState(Array(columns).fill({ unit: '1fr' }));
    const [rowArr, setRowArr] = useState(Array(rows).fill({ unit: '1fr' }));
    const [childarea, setChildarea] = useState<any>([]);
    const [errors, setErrors] = useState<any>({ col: [], row: [] });
    const [child, setChild] = useState({});
    const [previewArea, setPreviewArea] = useState<any>(null); // 添加预览区域状态
    const [isDragging, setIsDragging] = useState(false); // 跟踪拖动状态

    const widthfull = 'widthfull';

    const colTemplate = useMemo(() => colArr.map(c => c.unit).join(' '), [colArr]);
    const rowTemplate = useMemo(() => rowArr.map(r => r.unit).join(' '), [rowArr]);
    const divNum = useMemo(() => Array.from({ length: columns * rows }, (_, i) => i + 1), [columns, rows]);

    const validateunit = (e: any, i: any, direction: any) => {
        const unit = e.target.value;
        const valid = /fr$|px$|%$|em$|rem$|vw$|vh$|vmin$|q$|mm$|cm$|in$|pt$|pc$|ex$|ch$|minmax/.test(unit)
            || ["auto", "min-content", "max-content"].includes(unit)
            || parseInt(unit, 10) === 0;

        setErrors((prev: any) => {
            const updated: any = { ...prev };
            if (!valid) {
                if (!updated[direction].includes(i)) updated[direction].push(i);
            } else {
                updated[direction] = updated[direction].filter((index: any) => index !== i);
            }
            return updated;
        });
    };

    const placeChild = (item: any, startend: any, eventType: any) => {
        if (!item) return;
        const newChild: any = { ...child };
        newChild[`${startend}row`] = Math.ceil(item / columns);
        newChild[`${startend}col`] = item - (newChild[`${startend}row`] - 1) * columns;
        setChild(newChild);

        if (startend === 's') {
            setIsDragging(true);
            setPreviewArea(`${newChild.srow} / ${newChild.scol} / ${newChild.srow + 1} / ${newChild.scol + 1}`);
        } else if (startend === 'e' && eventType === 'mouseup') {
            setIsDragging(false);
            const [startRow, endRow] = newChild.srow <= newChild.erow ? [newChild.srow, newChild.erow] : [newChild.erow, newChild.srow];
            const [startCol, endCol] = newChild.scol <= newChild.ecol ? [newChild.scol, newChild.ecol] : [newChild.ecol, newChild.scol];
            const childstring = `${startRow} / ${startCol} / ${endRow + 1} / ${endCol + 1}`;

            const isOverlapping = childarea.some((existingChild: any) => {
                const [eStartRow, eStartCol, eEndRow, eEndCol] = existingChild.split(' / ').map(Number);
                return !(endRow < eStartRow || startRow > eEndRow - 1 || endCol < eStartCol || startCol > eEndCol - 1);
            });

            if (isOverlapping) {
                alert('新网格项与现有网格项重叠，请选择其他区域！');
                setPreviewArea(null);
                return;
            }
            setChildarea([...childarea, childstring]);
            setPreviewArea(null);
        }
    };

    const handleMouseMove = (e: any) => {
        if (!isDragging) return;
        const target: any = document.elementFromPoint(e.clientX, e.clientY);
        const id = target?.dataset?.id;
        if (id) {
            const newChild: any = { ...child };
            newChild.erow = Math.ceil(id / columns);
            newChild.ecol = id - (newChild.erow - 1) * columns;
            const [startRow, endRow] = newChild.srow <= newChild.erow ? [newChild.srow, newChild.erow] : [newChild.erow, newChild.srow];
            const [startCol, endCol] = newChild.scol <= newChild.ecol ? [newChild.scol, newChild.ecol] : [newChild.ecol, newChild.scol];
            setPreviewArea(`${startRow} / ${startCol} / ${endRow + 1} / ${endCol + 1}`);
            setChild(newChild);
        }
    };

    const handleTouch = (e: any) => {
        const touch = e.changedTouches[0];
        const target: any = document.elementFromPoint(touch.clientX, touch.clientY);
        const id = target?.dataset?.id;
        if (id) {
            placeChild(Number(id), e.type === 'touchstart' ? 's' : 'e', e.type);
        }
    };

    const removeChild = (index: any) => {
        setChildarea((prev: any) => prev.filter((_: any, i: any) => i !== index));
    };

    return (
        <main>
            <section
                className="colunits"
                style={{
                    gridTemplateColumns: colTemplate,
                    gridTemplateRows: '50px',
                    gridColumnGap: `${columngap}px`,
                    gridRowGap: `${rowgap}px`
                }}
            >
                {colArr.map((col, i) => (
                    <div key={i}>
                        <input
                            value={col.unit}
                            onChange={(e) => {
                                const updated = [...colArr];
                                updated[i].unit = e.target.value;
                                setColArr(updated);
                                validateunit(e, i, 'col');
                            }}
                            className={columns > 8 ? widthfull : ''}
                            aria-label="Grid Template Column Measurements"
                        />
                        {errors.col.includes(i) && (
                            <div className="errors">请输入合法单位</div>
                        )}
                    </div>
                ))}
            </section>

            <section
                className="rowunits"
                style={{
                    gridTemplateColumns: '50px',
                    gridTemplateRows: rowTemplate,
                    gridColumnGap: `${columngap}px`,
                    gridRowGap: `${rowgap}px`
                }}
            >
                {rowArr.map((row, i) => (
                    <div key={i}>
                        <input
                            value={row.unit}
                            onChange={(e) => {
                                const updated = [...rowArr];
                                updated[i].unit = e.target.value;
                                setRowArr(updated);
                                validateunit(e, i, 'row');
                            }}
                            aria-label="Grid Template Row Measurements"
                        />
                        {errors.row.includes(i) && (
                            <div className="errors">请输入合法单位</div>
                        )}
                    </div>
                ))}
            </section>

            <div id="gridcontainer" onMouseMove={handleMouseMove}>
                <section
                    className="grid"
                    style={{
                        gridTemplateColumns: colTemplate,
                        gridTemplateRows: rowTemplate,
                        gridColumnGap: `${columngap}px`,
                        gridRowGap: `${rowgap}px`
                    }}
                    onTouchStart={handleTouch}
                    onTouchEnd={handleTouch}
                >
                    {divNum.map((item, i) => (
                        <div
                            key={i}
                            className={`box${i}`}
                            data-id={item}
                            onMouseDown={() => placeChild(item, 's', 'mousedown')}
                            onMouseUp={(e) => placeChild(item, 'e', 'mouseup')}
                        />
                    ))}
                </section>

                <section
                    className="grid gridchild"
                    style={{
                        gridTemplateColumns: colTemplate,
                        gridTemplateRows: rowTemplate,
                        gridColumnGap: `${columngap}px`,
                        gridRowGap: `${rowgap}px`
                    }}
                >
                    {previewArea && (
                        <div
                            className="preview-area transition-all duration-300"
                            style={{ gridArea: previewArea, }}
                        />
                    )}
                    {childarea.map((child: any, i: any) => (
                        <div key={i} className={`child${i}`} style={{ gridArea: child }}>
                            <button onClick={() => removeChild(i)}>×</button>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
}