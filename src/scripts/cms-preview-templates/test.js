import React from "react";
import regeneratorRuntime from "regenerator-runtime";
import Mustache from "mustache";

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

        return import(/* webpackMode: "eager" */ `../../../site/layouts/partials/modules/${type}.html`).then(({ default: template }) => {
          const data = {};
          data.Module = {};

          el._root.entries.forEach((el) => {
            const key = el[0];
            const val = el[1];
            data.Module[key] = val;
          });

          // Change .Module variable to Module
          template = template.replace(/\.Module/g, "Module");

          return Mustache.render(template, data);
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

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getModules().then((data) => {
        this.setState({
          modules: data,
        });
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.modules.map((el, i) => {
          return <div key={i} dangerouslySetInnerHTML={{ __html: el }} />;
        })}
      </div>
    );
  }
}
