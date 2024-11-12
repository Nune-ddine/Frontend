// src/constants/snowmanItems.ts

export const SNOWMAN_ITEMS = {
shape: {
   default: [
      { name: "double", img: "/public/images/items/shape/shape_double.png" },
      { name: "triple", img: "/public/images/items/shape/shape_triple.png" },
      { name: "likelion", img: "/public/images/items/shape/shape_likelion.png" },
      { name: "puang", img: "/public/images/items/shape/shape_puang.png" },
   ],
},
face: {
   eye: [
      { name: "aing", img: "/public/images/items/face/eye/eye_aing.png" },
      { name: "button", img: "/public/images/items/face/eye/eye_button.png" },
      { name: "puang", img: "/public/images/items/face/eye/eye_puang.png" },
      { name: "shining", img: "/public/images/items/face/eye/eye_shining.png" },
   ],
   mouth: [
      { name: "button", img: "/public/images/items/face/mouth/mouth_button.png" },
      { name: "puang", img: "/public/images/items/face/mouth/mouth_puang.png" },
      { name: "smile", img: "/public/images/items/face/mouth/mouth_smile.png" },
      { name: "yummy", img: "/public/images/items/face/mouth/mouth_yummy.png" },
   ],
   nose: [
      { name: "carrot", img: "/public/images/items/face/nose/nose_carrot.png" },
      { name: "puang", img: "/public/images/items/face/nose/nose_puang.png" },
      { name: "rudolph", img: "/public/images/items/face/nose/nose_rudolph.png" },
      { name: "shining", img: "/public/images/items/face/nose/nose_shining.png" },
   ],
},
clothes: {
   hat: [
      { name: "bucket", img: "/public/images/items/clothes/hat/hat_bucket.png" },
      { name: "chesnut", img: "/public/images/items/clothes/hat/hat_chesnut.png" },
      { name: "santa", img: "/public/images/items/clothes/hat/hat_santa.png" },
      { name: "wool", img: "/public/images/items/clothes/hat/hat_wool.png" },
   ],
   muffler: [
      { name: "check", img: "/public/images/items/clothes/muffler/muffler_check.png" },
      { name: "green", img: "/public/images/items/clothes/muffler/muffler_green.png" },
      { name: "red", img: "/public/images/items/clothes/muffler/muffler_red.png" },
      { name: "yellow", img: "/public/images/items/clothes/muffler/muffler_yellow.png" },
   ],
},
} as const;
