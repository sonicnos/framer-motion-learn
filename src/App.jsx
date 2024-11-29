import { delay } from "motion";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 1,
    },
  },
};

const gridSquareVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const svgIconVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(252, 211, 77, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(252,211,77, 1)",
  },
};

function App() {
  const { scrollYProgress: completionProgress } = useScroll();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const mainControls = useAnimation();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const paragraphOneValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["-100%", "0%"]
  );

  const paragraphTwoValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["100%", "0%"]
  );

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <div className="flex flex-col gap-10 overflow-x-hidden">
      <motion.section
        variants={gridContainerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-10 p-10"
      >
        <motion.div
          variants={gridSquareVariants}
          className="flex items-center justify-center gap-10 rounded-lg bg-slate-800 aspect-square"
        >
          <motion.div
            className="w-20 h-20 rounded-lg bg-stone-100"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          ></motion.div>
          <motion.div
            className="w-20 h-20 rounded-full bg-stone-100"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          ></motion.div>
        </motion.div>
        <motion.div
          variants={gridSquareVariants}
          className="flex items-center justify-center gap-10 rounded-lg bg-slate-800 aspect-square"
        >
          <motion.div
            className="w-1/3 shadow-md h-1/3 bg-rose-400"
            animate={{
              scale: [1, 2, 2, 1],
              rotate: [0, 90, 90, 0],
              borderRadius: ["10%", "10%", "50%", "10%"],
            }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: 2,
              repeatDelay: 1,
            }}
          ></motion.div>
        </motion.div>
        <motion.div
          variants={gridSquareVariants}
          className="flex items-center justify-center gap-10 rounded-lg bg-slate-800 aspect-square"
        >
          <motion.button
            className="w-1/2 py-4 text-2xl font-light tracking-wide text-gray-100 rounded-lg bg-emerald-600"
            whileTap={{ scale: 0.9 }}
            transition={{ bounceDamping: 10, bounceStiffness: 600 }}
            whileHover={{ scale: 1.4, background: "#d1d5db", color: "black" }}
          >
            Test
          </motion.button>
        </motion.div>
        <motion.div
          variants={gridSquareVariants}
          className="flex items-center justify-center gap-10 rounded-lg bg-slate-800 aspect-square"
        >
          <motion.div
            className="w-1/4 bg-orange-600 h-1/4 rounded-3xl cursor-grab"
            drag
            dragConstraints={{
              top: -125,
              right: 125,
              bottom: 125,
              left: -125,
            }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
          ></motion.div>
        </motion.div>
        <motion.div
          variants={gridSquareVariants}
          className="flex items-center justify-center gap-10 rounded-lg bg-slate-800 aspect-square"
        >
          <motion.div className="w-40 origin-bottom aspect-square bg-gray-50/20 rounded-xl">
            <motion.div
              className="w-full h-full origin-bottom bg-gray-400 rounded-xl"
              style={{ scaleY: completionProgress }}
            ></motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          variants={gridSquareVariants}
          className="flex items-center justify-center gap-10 rounded-lg bg-slate-800 aspect-square"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-1/2 stroke-amber-500 stroke-[0.5]"
          >
            <motion.path
              d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              variants={svgIconVariants}
              initial="hidden"
              animate="visible"
              transition={{
                default: {
                  duration: 2,
                  ease: "easeInOut",
                  delay: 1,
                  repeat: Infinity,
                },
                fill: {
                  duration: 2,
                  ease: "easeIn",
                  delay: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                },
              }}
            ></motion.path>
          </motion.svg>
        </motion.div>
      </motion.section>
      <section className="flex flex-col gap-10 mb-10" ref={containerRef}>
        <motion.h1
          className="text-5xl tracking-wide text-center text-slate-100"
          animate={mainControls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          transition={{ delay: 0.3 }}
        >
          Keep Scrolling
        </motion.h1>
        <motion.p
          className="w-1/2 mx-auto text-4xl font-thin text-slate-100"
          style={{ translateX: paragraphOneValue }}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque
          corporis, optio neque aspernatur aperiam temporibus iure iusto itaque
          quos recusandae dolores eos, sunt aliquam nesciunt praesentium nam
          autem consequuntur dolor!
        </motion.p>
        <motion.p
          className="w-1/2 mx-auto text-4xl font-thin text-slate-100"
          style={{ translateX: paragraphTwoValue }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
          voluptatibus. Nemo nisi distinctio a commodi odio suscipit voluptate
          minima dolorem sunt ratione repudiandae ullam, obcaecati rem maxime
          alias? Sapiente, adipisci?
        </motion.p>
      </section>
    </div>
  );
}

export default App;
