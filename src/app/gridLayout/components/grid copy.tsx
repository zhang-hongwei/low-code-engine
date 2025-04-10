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
    const [errors, setErrors] = useState<{ col: number[]; row: number[] }>({ col: [], row: [] });
    const [child, setChild] = useState({});

    const widthfull = 'widthfull';

    const colTemplate = useMemo(() => colArr.map(c => c.unit).join(' '), [colArr]);
    const rowTemplate = useMemo(() => rowArr.map(r => r.unit).join(' '), [rowArr]);
    const divNum = useMemo(() => Array.from({ length: columns * rows }, (_, i) => i + 1), [columns, rows]);

    const validateunit = (e: any, i: any, direction: any) => {
        const unit = e.target.value;
        const valid = /fr$|px$|%$|em$|rem$|vw$|vh$|vmin$|q$|mm$|cm$|in$|pt$|pc$|ex$|ch$|minmax/.test(unit)
            || ["auto", "min-content", "max-content"].includes(unit)
            || parseInt(unit, 10) === 0;

        setErrors(prev => {
            const updated: any = { ...prev };
            if (!valid) {
                if (!updated[direction].includes(i)) updated[direction].push(i);
            } else {
                updated[direction] = updated[direction].filter((index: any) => index !== i);
            }
            return updated;
        });
    };

    const placeChild = (item: any, startend: any) => {
        if (!item) return;
        const newChild: any = { ...child };
        newChild[`${startend}row`] = Math.ceil(item / columns);
        newChild[`${startend}col`] = item - (newChild[`${startend}row`] - 1) * columns;
        setChild(newChild);

        if (startend === 'e') {
            const [startRow, endRow] = newChild.srow <= newChild.erow ? [newChild.srow, newChild.erow] : [newChild.erow, newChild.srow];
            const [startCol, endCol] = newChild.scol <= newChild.ecol ? [newChild.scol, newChild.ecol] : [newChild.ecol, newChild.scol];
            const childstring = `${startRow} / ${startCol} / ${endRow + 1} / ${endCol + 1}`;

            // 检查是否与现有网格项重叠
            const isOverlapping = childarea.some((existingChild: any) => {
                const [eStartRow, eStartCol, eEndRow, eEndCol] = existingChild.split(' / ').map(Number);
                // 矩形重叠检测：如果一个矩形完全在另一个外部，则不重叠
                return !(
                    endRow < eStartRow || startRow > eEndRow - 1 ||
                    endCol < eStartCol || startCol > eEndCol - 1
                );
            });

            if (isOverlapping) {
                alert('新网格项与现有网格项重叠，请选择其他区域！');
                return;
            }
            setChildarea([...childarea, childstring]);
        }
    };

    const handleTouch = (e: any) => {
        const touch: any = e.changedTouches[0];
        const target: any = document.elementFromPoint(touch.clientX, touch.clientY);
        const id: any = target?.dataset?.id;
        if (id) {
            placeChild(Number(id), e.type === 'touchstart' ? 's' : 'e');
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
                {rowArr.map((row: any, i: any) => (
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

            <div id="gridcontainer">
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
                            onMouseDown={() => placeChild(item, 's')}
                            onMouseUp={() => placeChild(item, 'e')}
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
                    {childarea.map((child: any, i: any) => (
                        <div key={i} className={`child${i}`} style={{ gridArea: child }}>
                            <button onClick={() => removeChild(i)}>&times;</button>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
}
