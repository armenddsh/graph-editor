import React, { useEffect } from "react";

export function withDragging(Component) {
  return function WithDraggingComponent({...props}) {

    const ref = React.useRef();
    const [data, setData] = React.useState(props.data);
    const [isDragging, setIsDragging] = React.useState(false);
    const [offset, setOffset] = React.useState({ x: 0, y: 0 });
    const objectMovedAllowed = React.useMemo(() => ["span", "div"]);
    
    const handlePointerUp = (event) => {
      setIsDragging(false);
    };

    useEffect(() => {
        props.onChange(data);
    }, [data]);
    
    const handlePointerDown = (event) => {
      const tagName = event.target.tagName.toLowerCase();
      if (objectMovedAllowed.includes(tagName)) {
        let hsRect = null;
        if (navigator.userAgent.indexOf("Firefox") > 0) {
          hsRect = ref.current.getBBox();
        } else {
          hsRect = ref.current.getBoundingClientRect();
        }
        setIsDragging(true);
        setOffset({ x: event.clientX - hsRect.x, y: event.clientY - hsRect.y });
      }
    };

    const handlePointerMove = (event) => {
      if (isDragging) {
        const dataCopy = JSON.parse(JSON.stringify(data));
        dataCopy.position.x = event.clientX - offset.x;
        dataCopy.position.y = event.clientY - offset.y;

        setData(dataCopy);
      }
    };

    return (
      <div
        ref={ref}
        onPointerUp={handlePointerUp}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="draggable-atom"
        style={{
          top: data.position.y,
          left: data.position.x
        }}
      >
        <Component {...data} />
      </div>
    );
  };
}
