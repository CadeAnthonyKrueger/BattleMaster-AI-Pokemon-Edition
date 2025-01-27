import React, { Component } from "react";

interface SpriteSheetMapProps {
    src: string;
    rows: number;
    cols: number;
    startRow?: number;
    startCol?: number;
    scaleFactor?: number;
    style?: React.CSSProperties;
}

interface SpriteSheetMapState {
    width: number;
    height: number;
    backgroundPosition: { x: number; y: number };
}

class SpriteSheetMap extends Component<SpriteSheetMapProps, SpriteSheetMapState> {

    private imageSrc: string;
    private style: React.CSSProperties | undefined;

    constructor(props: SpriteSheetMapProps) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            backgroundPosition: { 
                x: props.startCol ? props.startCol - 1 : 0, 
                y: props.startRow ? props.startRow - 1 : 0 
            }
        };
        this.imageSrc = `/assets/${props.src}`;
        this.style = props.style;
    }

    public incrementSprite() {
        this.setState((prev: Readonly<SpriteSheetMapState>) => {
            let x = prev.backgroundPosition.x;
            let y = prev.backgroundPosition.y;
            if ((x + 1) >= this.props.cols) {
                x = 0;
                y += 1;
                if (y >= this.props.rows) { x = 0; y = 0; }
            } else { x += 1 }
            return ({
                ...prev,
                backgroundPosition: { x: x, y: y }
            });
        });
    }

    public decrementSprite() {
        this.setState((prev: Readonly<SpriteSheetMapState>) => {
            let x = prev.backgroundPosition.x;
            let y = prev.backgroundPosition.y;
            if ((x - 1) < 0) {
                x = this.props.cols - 1;
                y -= 1;
                if (y < 0) { x = this.props.cols - 1; y = this.props.rows - 1; }
            } else { x -= 1 }
            return ({
                ...prev,
                backgroundPosition: { x: x, y: y }
            });
        });
    }

    public changeSprite(row: number, col: number) {
        this.setState({ backgroundPosition: { x: col - 1, y: row - 1 }});
    }  

    private getBackgroundPosition() {
        const x = this.state.backgroundPosition.x * (this.props.cols > 1 ? (100 / (this.props.cols - 1)) : 0);
        const y = this.state.backgroundPosition.y * (this.props.rows > 1 ? (100 / (this.props.rows - 1)) : 0);
        return (`${x}% ${y}%`);
    }

    componentDidMount() {
        const img = new Image();
        img.src = this.imageSrc;
        img.onload = () => {
            this.setState({
                width: img.naturalWidth,
                height: img.naturalHeight
            });
        };
        img.onerror = () => {
            console.error(`Failed to load image: ${this.imageSrc}`);
        };
    }

    render() {
        const { rows, cols } = this.props;
        const { width, height } = this.state;

        const stylesCombined = { ...{
            height: `${100 * (this.props.scaleFactor ? this.props.scaleFactor : 1)}%`,
            aspectRatio: `${width / cols}/${height / rows}`,
            backgroundImage: `url('${this.imageSrc}')`,
            backgroundPosition: `${this.getBackgroundPosition()}`,
            backgroundSize: `${cols * 100}% ${rows * 100}%`,
            backgroundRepeat: "no-repeat",
        }, ...this.style };

        return (
            <div className="Sprite" style={stylesCombined}/>
        );
    }
}

export default SpriteSheetMap;
