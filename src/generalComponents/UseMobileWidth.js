import React, { useState } from "react";
import { useEffect } from "react";

const UseMobileWidth = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => setIsMobile(window.innerWidth < 700), [])
    window.addEventListener("resize", () => setIsMobile(window.innerWidth < 700));
    return isMobile;
};

export default UseMobileWidth;
