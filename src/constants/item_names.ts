// src/constants/snowmanItems.ts

export const SNOWMAN_ITEMS = {
shape: {
   default: ["double", "triple", "likelion", "puang"],      // 기본 모양
},
face: {
   eye: ["red", "blue", "green"],       
   mouth: ["yellow", "purple", "orange"],    
   nose: ["black", "white", "gray"],      
},
clothes: {
   hat: ["scarf", "hat", "gloves"],      
   muffler: ["sunglasses", "watch"],                    // 겨울용 액세서리
}
} as const;
