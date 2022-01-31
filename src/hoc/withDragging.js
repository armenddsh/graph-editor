import React, { useEffect } from "react";

export function withDragging(Component) {
  return function WithDraggingComponent({ ...props }) {
    const ref = React.useRef();
    const isDragging = React.useRef(false);
    const offset = React.useRef({ x: 0, y: 0 });
    const situation = React.useRef();

    const [data, setData] = React.useState(props.data);
    const objectMovedAllowed = React.useMemo(() => ["span", "div"]);

    const handlePointerUp = (event) => {
      isDragging.current = false;
    };

    useEffect(() => {
      document.addEventListener("pointerdown", handlePointerDown);
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);

      () => {
        document.removeEventListener("pointerdown");
        document.removeEventListener("pointermove");
        document.removeEventListener("pointerup");
      };
    }, []);

    useEffect(() => {
      props.onChange(data);
    }, [data]);

    const handlePointerDown = (event) => {
      let isAtom = false;

      let target = event.target;
      while (!isAtom) {

        const className = target.className;
        if (className === "draggable-atom") {
          const tagName = event.target.tagName.toLowerCase();
          if (objectMovedAllowed.includes(tagName)) {
            let hsRect = null;
            if (navigator.userAgent.indexOf("Firefox") > 0) {
              hsRect = ref.current.getBBox();
            } else {
              hsRect = ref.current.getBoundingClientRect();
            }
            offset.current = {
              x: event.clientX - hsRect.x,
              y: event.clientY - hsRect.y,
            };
            situation.current = target.getAttribute("data-id");
            isDragging.current = true;

            break;
          }
        }
        if (target.parentNode) {
          target = target.parentNode;
        } else {
          break;
        }
      }
    };

    const handlePointerMove = (event) => {
      if (isDragging.current && situation.current === data.id) {
        const dataCopy = JSON.parse(JSON.stringify(data));
        dataCopy.position.x = event.clientX - offset.current.x;
        dataCopy.position.y = event.clientY - offset.current.y;

        setData(dataCopy);
      }
    };

    return (
      <div
        ref={ref}
        data-id={data.id}
        className="draggable-atom"
        style={{
          top: data.position.y,
          left: data.position.x,
        }}
      >
        <Component {...data} />
      </div>
    );
  };
}
