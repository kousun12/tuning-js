# tuning-js
musical tuning function used to create well tuned computers


## Usage

```typescript
import Tuning from "./Tuning";

// E.g. La Monte Young's "Well Tuned Piano"
const LMYRatios = ["567/512", "9/8", "147/128", "21/16", "1323/1024", "189/128", "3/2", "49/32", "7/4", "441/256", "63/32", "1200."];


// Initialize with either string ratios or cents, per the .scl spec
const lmy = new Tuning(LMYRatioStrings);

console.log(lmy.ratios())
// [1.107421875, 1.125, 1.1484375, 1.3125, 1.2919921875, 1.4765625, 1.5, 1.53125, 1.75, 1.72265625, 1.96875, 2]

console.log(lmy.frequency(0)) // tonic frequency, 440 by default
// 440

console.log(lmy.frequency(0, 1)) // frequency one octave up
// 880

console.log(lmy.frequencies())
// [440, 487.265625, 495, 505.3125, 577.5, 568.4765625, 649.6875, 660, 673.75, 770, 757.96875, 866.25]

console.log(lmy.frequencies(-1)[0]) // optional arg to shift octave up or down
// 220


// Same ratios, but pin A in E♭ tonic to 440Hz
const lmyEb = new Tuning(LMYRatioStrings, [440, 6]);

console.log(lmyEb.frequencies())
// [297.989417989418, 330, 335.23809523809524, 342.22222222222223, 391.1111111111111, 385, 440, 446.984126984127, 456.29629629629625, 521.4814814814814, 513.3333333333333, 586.6666666666666];
```
