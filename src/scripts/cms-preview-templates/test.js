import React from "react";
import { parse } from "@ctrl/golang-template";
import regeneratorRuntime from "regenerator-runtime";

export default class TestPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modules: [],
    };
  }

  async getModules() {
    const { entry, getAsset } = this.props;
    const moduleEntries = entry.getIn(["data", "modules"]);
    return Promise.all(
      moduleEntries._tail.array.map((el) => {
        const type = el._root.entries[0][1];

        return import(/* webpackMode: "eager" */ `../../../site/layouts/partials/modules/${type}.html`).then(({ default: module }) => {
          const Module = {};
          el._root.entries.forEach((el) => {
            let val = el[1];
            // if (val.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)) {
            //   console.log(val);
            //   val = getAsset(val);
            //   console.log("asset", val);
            // }

            Module[el[0]] = val;
          });

          return parse(module, { Module });
        });
      })
    );
  }

  componentDidMount() {
    this.getModules().then((data) => {
      this.setState({
        modules: data,
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.modules.map((el) => {
          return <div dangerouslySetInnerHTML={{ __html: el }} />;
        })}
      </div>
    );
  }
}
