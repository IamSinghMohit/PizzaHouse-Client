"use client";

import Typewriter from "typewriter-effect";


export default function HomeTypeWriter() {
    return (
        <Typewriter
            onInit={(typewriter) => {
                typewriter
                    .typeString("pizza")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("briyani")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("coldrinks")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("momoes")
                    .pauseFor(1000)
                    .deleteAll()
                    .start()
            }}
            options={{
                loop: true,
            }}
        />
    );
}
