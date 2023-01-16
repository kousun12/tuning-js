import { describe, expect, test } from "@jest/globals";
import Tuning from "../Tuning";

const ETCents = [
  "100.",
  "200.",
  "300.",
  "400.",
  "500.",
  "600.",
  "700.",
  "800.",
  "900.",
  "1000.",
  "1100.",
  "1200.",
];
const LMYRatioStrings = [
  "567/512",
  "9/8",
  "147/128",
  "21/16",
  "1323/1024",
  "189/128",
  "3/2",
  "49/32",
  "7/4",
  "441/256",
  "63/32",
  "2/1",
];

const LMYRatios = [
  1.107421875, 1.125, 1.1484375, 1.3125, 1.2919921875, 1.4765625, 1.5, 1.53125,
  1.75, 1.72265625, 1.96875, 2,
];
const ETRatios = [
  1.0594630943592953, 1.122462048309373, 1.189207115002721, 1.2599210498948732,
  1.3348398541700344, 1.4142135623730951, 1.4983070768766815,
  1.5874010519681994, 1.6817928305074292, 1.7817974362806788, 1.887748625363387,
  2,
];

describe("Tunings", () => {
  test("computes scale ratios from string ratios", () => {
    const t = new Tuning(LMYRatioStrings);
    expect(t.scaleRatios).toEqual(LMYRatios);
  });

  test("computes scale ratios from string cents", () => {
    const t = new Tuning(ETCents);
    expect(t.scaleRatios).toEqual(ETRatios);
  });

  test("computes frequency", () => {
    const t = new Tuning(LMYRatioStrings);
    expect(t.frequency(0)).toEqual(440);
    for (let i = 1; i < LMYRatios.length - 1; i++) {
      expect(t.frequency(i)).toEqual(440 * LMYRatios[i - 1]);
    }
  });

  test("computes frequency when given a tonic to pin", () => {
    // Pin A to 440, with tonic E♭
    const t = new Tuning(LMYRatioStrings, [440, 6]);
    expect(t.tonic).toEqual(297.989417989418);
    expect(t.frequency(0)).toEqual(297.989417989418);
    expect(t.frequency(6)).toEqual(440);
  });

  test("lists frequencies", () => {
    // Pin A to 440, with tonic E♭
    const t = new Tuning(LMYRatioStrings, [440, 6]);
    const expected = [
      297.989417989418, 330, 335.23809523809524, 342.22222222222223,
      391.1111111111111, 385, 440, 446.984126984127, 456.29629629629625,
      521.4814814814814, 513.3333333333333, 586.6666666666666,
    ];
    expect(t.frequencies()).toEqual(expected);
    expect(t.frequencies(1)).toEqual(expected.map((f) => f * 2));
  });
});
