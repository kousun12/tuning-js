export default class Tuning {
  tonic: number;
  scale: string[];
  scaleRatios: number[];

  /**
   *
   * @param scale array of scale elements, each of which are either cents or ratios from tonic
   * @param tonic either a frequency for the scale tonic, or a tuple pinning a scale index to a frequency,
   * e.g. [440, 9] to pin A to 440Hz in a C Major equal temperament scale
   */
  constructor(scale: string[], tonic?: number | [number, number]) {
    this.scale = scale || [];
    this.scaleRatios = Tuning.normalizeScale(scale);
    if (tonic && Array.isArray(tonic)) {
      this.tonic = Tuning._tonicFromTuple(tonic, scale);
    } else if (typeof tonic === "number") {
      this.tonic = tonic;
    } else {
      this.tonic = 440;
    }
  }

  /**
   * Translate the scale to a normalized scale, as ratios.
   *
   * From the .scl format spec:
   * > After that come the pitch values, each on a separate line, either as a ratio or as a value in cents. If the value contains a period, it is a cents value, otherwise a ratio. Ratios are written with a slash, and only one. Integer values with no period or slash should be regarded as such, for example "2" should be taken as "2/1". Numerators and denominators should be supported to at least 231-1 = 2147483647. Anything after a valid pitch value should be ignored. Space or horizontal tab characters are allowed and should be ignored. Negative ratios are meaningless and should give a read error.
   */
  static normalizeScale(scale: string[]) {
    const totalCents = scale.length * 100;
    return scale.map((value) => {
      const asString = String(value);
      if (asString.includes(".")) {
        // in cents
        const cents = Number(asString);
        return Math.pow(2, cents / totalCents);
      } else {
        // as ratio
        return eval(value);
      }
    });
  }

  private static _tonicFromTuple(
    [frequency, idx]: [number, number],
    scale: string[]
  ) {
    const ratios = Tuning.normalizeScale(scale);
    const ratio = ratios[idx - 1];
    return frequency / ratio;
  }

  public frequencies(octaveOffset?: number) {
    return this.scale.map((_, i) => this.frequency(i, octaveOffset));
  }

  public frequency(scaleIndex, octaveOffset = 0) {
    const dividend = Math.floor(scaleIndex / this.scale.length);
    const octave = dividend + (octaveOffset || 0);
    const idx = scaleIndex % this.scale.length;
    const ratio = idx === 0 ? 1 : this.scaleRatios[idx - 1];
    return this.tonic * ratio * Math.pow(2, octave);
  }
}
