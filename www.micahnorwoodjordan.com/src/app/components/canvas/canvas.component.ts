import { Component, OnInit } from '@angular/core';
import { ContextService } from '../../services/context.service';


@Component({
  selector: 'app-canvas',
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})

export class CanvasComponent implements OnInit {
  constructor(private contextService: ContextService) { }

  private canvas: HTMLCanvasElement | null = null;
  private canvasContext: CanvasRenderingContext2D | null = null;
  private animationFrameId: number = 0;
  private readonly characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private readonly fontSizeDesktop = 100;
  private readonly fontSizeMobile = 35;
  private readonly canvasBackdropColorCode: string = 'rgba(0, 0, 0, 0.05)';
  private readonly fontName: string = 'DinaRemaster';
  private readonly matrixColorChangeFrequencyMillis: number = 5000;
  private matrixColor: string = '#219d51';
  private columns: number = 0;
  private columnPositions: number[] = [];
  private userOnMobile: boolean = false;
  private mobileDesktopValueMapping: any;

  private setCanvas(newCanvas: any) { this.canvas = newCanvas; }
  private setMatrixColor(newColor: string) { this.matrixColor = newColor; }
  private setUserOnMobile(newValue: boolean) { this.userOnMobile = newValue; }
  private setColumns(newValue: number) { this.columns = newValue; }
  private setColumnPositions(newPositions: number[]) { this.columnPositions = newPositions; }
  private setMobileDesktopValueMapping(newMapping: Object) { this.mobileDesktopValueMapping = newMapping; }

  ngOnInit() {
    this.setUserOnMobile(this.contextService.userIsOnMobile);
    this.setCanvas(document.getElementById('matrixCanvas') as HTMLCanvasElement);

    this.setMobileDesktopValueMapping(
      {
        canvasContextFontSizeScaleCoefficient: this.userOnMobile ? 1.21 : 1.18,
        fontSize: this.userOnMobile ? this.fontSizeMobile : this.fontSizeDesktop,
        fontString: this.userOnMobile ? this.fontSizeMobile + this.fontName : this.fontSizeDesktop + this.fontName,
        yCoordinateDrawCoefficient: this.userOnMobile ? 1.5 : 1,  // distance between any 2 letters within a "raindrop"
        columnSpreadCoefficient: this.userOnMobile ? this.fontSizeMobile : this.fontSizeDesktop,  // distance between any 2 "raindrops"
        drawFrequencyCoefficient: this.userOnMobile ? 0.975 : 0.985  // how often the "raindrops" fall
      }
    );

    if (this.canvas !== null) {
      this.canvasContext = this.canvas.getContext('2d');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      this.setColumns(Math.floor(this.canvas.width / this.mobileDesktopValueMapping.columnSpreadCoefficient));
      this.setColumnPositions(Array(this.columns).fill(1));
      this.animateMatrix();
      this.changeMatrixColor();
    }
  }

  private changeMatrixColor() {
    setInterval(() => {
      if (this.canvasContext !== null) {
        Math.round(Math.random()) === 1 ? this.setMatrixColor('#219d51') : this.setMatrixColor('orange');
      }
    }, this.matrixColorChangeFrequencyMillis)
  }

  private setCanvasFillStyle(newFillStyle: string) {
    if (this.canvas && this.canvasContext) {
      this.canvasContext.fillStyle = newFillStyle;
    } else {
      console.log(`CanvasComponent.setCanvasFillStyle: canvas: ${this.canvas} -- canvasContext: ${this.canvasContext}`);
    }
  }

  private animateMatrix() {
    let mapping = this.mobileDesktopValueMapping;

    if (this.canvasContext && this.canvas ) {
      // --------------------------------------------------------------------------------
      // NOTE: changing the order of these calls will break the visual aspect of the matrix effect. i assume that what's happening is this:
      // 1: set fillstyle to black
      // 2: the entire space within the canvas gets set to the current black fillstyle
      // 3: set fillstyle to `this.matrixColor`
      // 4: matrix characters ("raindrops") are drawn according to the current `this.matrixColor` fillstyle
      this.setCanvasFillStyle(this.canvasBackdropColorCode);
      this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.setCanvasFillStyle(this.matrixColor);
      // --------------------------------------------------------------------------------
      this.canvasContext.font = mapping.fontString;

      for (let i = 0; i < this.columns; i++) {;
        const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        const xCoordinate = i * mapping.fontSize * mapping.canvasContextFontSizeScaleCoefficient;
        const yCoordinate = this.columnPositions[i] * mapping.fontSize * mapping.yCoordinateDrawCoefficient;

        this.canvasContext.fillText(text, xCoordinate, yCoordinate);
  
        if (yCoordinate > this.canvas.height && Math.random() > mapping.drawFrequencyCoefficient) {
          this.columnPositions[i] = 0;
        }
        this.columnPositions[i]++;
      }
      this.animationFrameId = requestAnimationFrame(this.animateMatrix.bind(this));
    }
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
  }
}
