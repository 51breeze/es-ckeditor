const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

// const autoprefixer = require("autoprefixer")
// const postcssNesting = require('postcss-nesting');
// const postcssMixins = require('postcss-mixins');
// const postcssImport = require('postcss-import');
// const postcss = require("postcss");

const esbuildPostcss = (options = { plugins: [] }) => ({
  name: "postcss",
  setup: function (build) {
    build.onLoad({ filter: /.\.(css)$/, namespace: "file" },
    async (args) => {
        const file = path.resolve(args.resolveDir, args.path);
        const css =fs.readFileSync(file);
        const result = await postcss(options.plugins).process(css, {
          from: file
        });
        return {
          contents:result.css,
          loader:'css'
        }
    })
  },
});


const modules_path = path.resolve('node_modules')
const resolveCssPlugin = ()=>{
  return {
    name: 'resolve-css-path',
    setup(build) {
      build.onResolve({ filter: /\.css/ }, args => {
        const file = path.resolve(args.resolveDir, '../node_modules', args.path);
        const p = path.relative(modules_path, file).replace(/\\/g, '/')
        return {path:p, external:true}
      })
    },
  }
}

const srcDir = path.resolve( __dirname, '../src')

const resolveCkeditorPlugin = (options={})=>{
  return {
    name: 'resolve-ckeditor-path',
    setup(build) {
      build.onResolve({ filter: /(@ckeditor[\\\/]|ckeditor5-([\w]+)[\\\/]src[\\\/])/}, args => {
        if( /\.css/.test(args.path) )return;
        if( /\.svg/.test(args.path) )return;

        let file = args.resolveDir.includes(srcDir) ? path.resolve(args.resolveDir, '../node_modules', args.path) : path.resolve(args.resolveDir, args.path);
        if( args.path.substring(0,1) === '@' ){
          file = require.resolve(path.resolve(modules_path, args.path))
        }

        const result = (/[\\\/]ckeditor5-([\w]+)[\\\/]src[\\\/]/).exec(args.path);
        if( result ){
          if(options.exclude==result[1]){
            return;
          }
          return {path:`es-ckeditor-lib/lib/${result[1]}`, external:true}
        }
        const res = /@ckeditor[\\\/]ckeditor5-([\w]+)$/.exec(args.path);
        if(res){
          if(options.exclude==res[1]){
            return
          }
          return {path:`es-ckeditor-lib/lib/${res[1]}`, external:true}
        }
        return;
      })
    },
  }
}


const minify = false;

const configs = [
  {
    name:'core',
    plugins:[
      resolveCkeditorPlugin({exclude:'core'})
    ]
  },
  {
    name:'editor',
    plugins:[
      resolveCkeditorPlugin()
    ]
  },
  {
    name:'engine',
    plugins:[
      resolveCkeditorPlugin({exclude:'engine'})
    ]
  },
  {
    name:'ui',
    plugins:[
      resolveCkeditorPlugin({exclude:'ui'})
    ]
  },
  {
    name:'utils',
    plugins:[
      resolveCkeditorPlugin({exclude:'utils'})
    ]
  
  },
  {
    name:'watchdog',
    plugins:[
      resolveCkeditorPlugin({exclude:'watchdog'})
    ]
  }
]

const tasks = configs.map( item=>{

  return esbuild.build({
    entryPoints:[path.join(__dirname,`../src/${item.name}.js`)],
    bundle: true,
    outdir: './lib',
    external: [
      'vanilla-colorful/*','lodash-es'
    ],
    absWorkingDir:path.join(__dirname,'../'),
    format: 'esm',
    platform: 'node',
    minify:minify,
    define: { 'process.env.NODE_ENV': '"production"' },
    loader: {
      '.png': 'dataurl',
      '.svg': 'text',
    },
    plugins: [
      resolveCssPlugin(),
      // esbuildPostcss({
      //   plugins: [
      //     autoprefixer,
      //     postcssNesting(),
      //     postcssMixins(),
      //     postcssImport()
      //   ],
      // }),
      ...(item.plugins||[])
    ],
  })

})

Promise.all(tasks).then( ()=>{
  console.log('Build done.\r\n')
}).catch(() =>{
  console.log('Build error.\r\n')
  process.exit(1);
})