type ScaleProps = {
    unitsPerPixel: number,
}

export class Scale {
    private unitsPerPixel: number;
    private zoomStep = 10;

    constructor(props: ScaleProps){
        this.unitsPerPixel = props.unitsPerPixel;
    }

    private setScale = (metersPerPixel: number) => {
        this.unitsPerPixel = metersPerPixel;
    }

    get value() {
        return this.unitsPerPixel;
    }

    up = () => {
        this.setScale(this.unitsPerPixel + this.zoomStep)
    }

    down = () => {
        const nextScaleValue = this.unitsPerPixel - this.zoomStep;

        if(nextScaleValue <= 0) {
            this.setScale(1);

            return;
        }

        this.setScale(nextScaleValue)
    }
}