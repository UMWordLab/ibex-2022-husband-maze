PennController.ResetPrefix(null); // Shorten command names (keep this line here))
PennController.DebugOff();

var shuffleSequence = seq("setup", "intro",
                        "startpractice",
                        sepWith("sep", seq("practice")),
 // putting counter after practice so it won't increment all at the same time when participants show up, as that messes up lists
                        "setcounter",
                        "starter",
 // trials named _dummy_ will be excluded by following:
                        sepWith("sep", rshuffle(startsWith("husb"))),
 						"sendresults",
                        "end"
                );

var showProgressBar =false;

var practiceItemTypes = ["practice"];

var manualSendResults = true;

// this doesn't work for pushed CSV items
var defaults = [
    "Maze", {redo: true}, //uncomment to try "redo" mode
];

// following is from the A-maze site to make breaks every 20 maze sentences
// you have to set the write number of total items and number of blocks to start with, and the right condition names, etc.
// calculate the following numbers to fill in the values below (not including practice trials-
// total maze sentences a participant will be presented: 80
// sentences per block: 20
// number of blocks: 4

function modifyRunningOrder(ro) {

  var new_ro = [];
  item_count=0;
  for (var i in ro) {
    var item = ro[i];
    // fill in the relevant experimental condition names on the next line
    if (item[0].type.startsWith("husb")) {
        item_count++;
        new_ro.push(item);
      // first number after item count is how many items between breaks. second is total-items - 1
        if (item_count%20===0 & item_count<79){
       // value here should be total_items - items_per_block (to trigger message that last block is coming up)
            if (item_count===60){
                text="End of block. Only 1 block left!";
                }
            else {
      // first number is the total number of blocks. second number is number of items per block
                text="End of block. "+(4-(Math.floor(item_count/20)))+" blocks left.";
            }ro[i].push(new DynamicElement("Message", 
                              { html: "<p>30-second break - stretch and look away from the screen briefly if needed.</p>", transfer: 30000 }));
        }
      } else {
      new_ro.push(item);
      }
  }
  return new_ro;
}

// template items will be pushed into native items = [] with fake PC trial _dummy_ output

// [["practice", 802], "Maze", {s:"Why was the boss smiling during the meeting?",
// a:"x-x-x card plan chaired filters allow push considerably?"}]

// load experimental stimuli from csv:

Template("husband_2022_stimuli.csv", row => {
    items.push(
        [[row.label, row.item] , "PennController", newTrial(
            newController("Maze", {s: row.sentence, a: row.alternative, redo: true})
              .print()
              .log()
              .wait()
        )
        .log("counter", __counter_value_from_server__)
        .log("label", row.label)
        .log("latinitem", row.item)
        .log("critical_position", row.critical_position)
        .log("target_article", row.target_article)
        .log("target_noun", row.target_noun)
        ]
    );
    return newTrial('_dummy_',null);
})

var items = [

	["setcounter", "__SetCounter__", { }],

	["sendresults", "__SendResults__", { }],

	["sep", "MazeSeparator", {normalMessage: "Correct! Press any key to continue", errorMessage: "Incorrect! Press any key to continue."}],

["intro", "Form", { html: { include: "intro1.html" } } ],

["startpractice", Message, {consentRequired: false,
	html: ["div",
		   ["p", "First you can do three practice sentences."]
		  ]}],

//
//  practice items
//

[["practice", 801], "Maze", {s:"The teacher perplexed the first class.", a:"x-x-x tends bisects done continues holy"}],
[["practice", 802], "Maze", {s:"The boss understandably smiled during the meeting.", a:"x-x-x about obligatoriness filters allow push considerably."}],
[["practice", 803], "Maze", {s:"The father chuckled while he cleaned.", a:"x-x-x slid quadratic goals add analyst."}],

   // message that the experiment is beginning


   ["starter", Message, {consentRequired: false,
	html: ["div",
		   ["p", "Time to start the main portion of the experiment!"]
		  ]}],

// completion: 

["completion", "Form", {continueMessage: null, html: { include: "completion.html" } } ]

// leave this bracket - it closes the items section
];

// prolific page URL: 
