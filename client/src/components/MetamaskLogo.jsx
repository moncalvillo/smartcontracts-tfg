import { Component } from 'react';
import ModelViewer from '@metamask/logo';

class MetamaskLogo extends Component{

   componentDidMount(){
       this.viewer = ModelViewer({
           pxNotRatio:true,
           width:200,
           height:200,
           followMouse:true,
           slowDrift: false,
       });
       this.el.appendChild(this.viewer.container);
    }

    componentWillUnmount(){
        this.viewer.stopAnimation();
    }


    render() {
        return (
            <div id="metamask-logo" ref={(el) => (this.el = el)}> </div>
        );
    }
}

export default MetamaskLogo;