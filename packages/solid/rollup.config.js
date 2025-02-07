import copy from "rollup-plugin-copy";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import cleanup from "rollup-plugin-cleanup";
import replace from "@rollup/plugin-replace";

const plugins = [
  nodeResolve({
    extensions: [".js", ".ts"]
  }),
  babel({
    extensions: [".js", ".ts"],
    exclude: "node_modules/**",
    babelrc: false,
    babelHelpers: "bundled",
    presets: ["@babel/preset-typescript"],
    plugins: [
      [
        "babel-plugin-transform-rename-import",
        {
          original: "rxcore",
          replacement: `../../../packages/solid/web/src/core`
        }
      ]
    ]
  }),
  cleanup({
    comments: ["some", /PURE/],
    extensions: [".js", ".ts"]
  })
];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/solid.cjs",
        format: "cjs"
      },
      {
        file: "dist/solid.js",
        format: "es"
      }
    ],
    plugins: [
      replace({
        '"_SOLID_DEV_"': false,
        preventAssignment: true,
        delimiters: ["", ""]
      }),
      copy({
        targets: [
          {
            src: "./src/jsx.d.ts",
            dest: "./types/"
          }
        ]
      })
    ].concat(plugins)
  },
  {
    input: "src/server/index.ts",
    output: [
      {
        file: "dist/server.cjs",
        format: "cjs"
      },
      {
        file: "dist/server.js",
        format: "es"
      }
    ],
    external: ["stream"],
    plugins
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/dev.cjs",
        format: "cjs"
      },
      {
        file: "dist/dev.js",
        format: "es"
      }
    ],
    plugins
  },
  {
    input: "store/src/index.ts",
    output: [
      {
        file: "store/dist/store.cjs",
        format: "cjs"
      },
      {
        file: "store/dist/store.js",
        format: "es"
      }
    ],
    external: ["solid-js"],
    plugins: [
      replace({
        '"_SOLID_DEV_"': false,
        preventAssignment: true,
        delimiters: ["", ""]
      })
    ].concat(plugins)
  },
  {
    input: "store/src/server.ts",
    output: [
      {
        file: "store/dist/server.cjs",
        format: "cjs"
      },
      {
        file: "store/dist/server.js",
        format: "es"
      }
    ],
    external: ["solid-js"],
    plugins
  },
  {
    input: "store/src/index.ts",
    output: [
      {
        file: "store/dist/dev.cjs",
        format: "cjs"
      },
      {
        file: "store/dist/dev.js",
        format: "es"
      }
    ],
    external: ["solid-js"],
    plugins
  },
  {
    input: "web/src/index.ts",
    output: [
      {
        file: "web/dist/web.cjs",
        format: "cjs"
      },
      {
        file: "web/dist/web.js",
        format: "es"
      }
    ],
    external: ["solid-js"],
    plugins: [
      replace({
        '"_DX_DEV_"': false,
        preventAssignment: true,
        delimiters: ["", ""]
      }),
      copy({
        targets: [
          {
            src: ["../../node_modules/dom-expressions/src/client.d.ts"],
            dest: "./web/src/"
          },
          { src: "../../node_modules/dom-expressions/src/client.d.ts", dest: "./web/types/" }
        ]
      })
    ].concat(plugins)
  },
  {
    input: "web/server/index.ts",
    output: [
      {
        file: "web/dist/server.cjs",
        format: "cjs"
      },
      {
        file: "web/dist/server.js",
        format: "es"
      }
    ],
    external: ["solid-js", "stream"],
    plugins: [
      copy({
        targets: [
          {
            src: ["../../node_modules/dom-expressions/src/server.d.ts"],
            dest: "./web/server"
          }
        ]
      })
    ].concat(plugins)
  },
  {
    input: "web/src/index.ts",
    output: [
      {
        file: "web/dist/dev.cjs",
        format: "cjs"
      },
      {
        file: "web/dist/dev.js",
        format: "es"
      }
    ],
    external: ["solid-js"],
    plugins
  },
  {
    input: "universal/src/index.ts",
    output: [
      {
        file: "universal/dist/universal.cjs",
        format: "cjs"
      },
      {
        file: "universal/dist/universal.js",
        format: "es"
      }
    ],
    external: ["solid-js"],
    plugins: [
      replace({
        '"_DX_DEV_"': false,
        preventAssignment: true,
        delimiters: ["", ""]
      }),
      copy({
        targets: [
          {
            src: ["../../node_modules/dom-expressions/src/universal.d.ts"],
            dest: "./universal/src/"
          },
          {
            src: "../../node_modules/dom-expressions/src/universal.d.ts",
            dest: "./universal/types/"
          }
        ]
      })
    ].concat(plugins)
  },
  {
    input: "universal/src/index.ts",
    output: [
      {
        file: "universal/dist/dev.cjs",
        format: "cjs"
      },
      {
        file: "universal/dist/dev.js",
        format: "es"
      }
    ],
    external: ["solid-js"],
    plugins
  },
  {
    input: "html/src/index.ts",
    output: [
      {
        file: "html/dist/html.cjs",
        format: "cjs",
        exports: "auto"
      },
      {
        file: "html/dist/html.js",
        format: "es"
      }
    ],
    external: ["solid-js/web"],
    plugins
  },
  {
    input: "h/src/index.ts",
    output: [
      {
        file: "h/dist/h.cjs",
        format: "cjs",
        exports: "auto"
      },
      {
        file: "h/dist/h.js",
        format: "es"
      }
    ],
    external: ["solid-js/web"],
    plugins
  },
  {
    input: "h/jsx-runtime/src/index.ts",
    output: [
      {
        file: "h/jsx-runtime/dist/jsx.cjs",
        format: "cjs"
      },
      {
        file: "h/jsx-runtime/dist/jsx.js",
        format: "es"
      }
    ],
    external: ["solid-js/h"],
    plugins: [
      copy({
        targets: [
          {
            src: "./h/jsx-runtime/src/jsx.d.ts",
            dest: "./h/jsx-runtime/types/"
          }
        ]
      })
    ].concat(plugins)
  }
];
