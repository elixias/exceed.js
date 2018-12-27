module.exports = 

class Gacha {
	constructor(){
		this.drops = [
			{"item":"New Clothes","rate":2},
			{"item":"Clothes Shard","rate":10},
			{"item":"Headwear","rate":10},
			{"item":"Out of Print Headwear","rate":0.1},
			{"item":"Out of Print Weapon","rate":0.1},
			{"item":"Out of Print Collection","rate":0.2},
			{"item":"Past Clothing","rate":0.2},
			{"item":"Past Headwear","rate":1},
			{"item":"Hairstyle","rate":10},
			{"item":"Cosmetic Lens","rate":10},
			{"item":"Food","rate":10},
			{"item":"Zeny","rate":8.9},
			{"item":"Bloody Dead Branch","rate":6},
			{"item":"Card","rate":5},
			{"item":"Other Item","rate":26.5}
		]
		let total_rate = 0;
		for (var i in this.drops) {
				total_rate += this.drops[i].rate
				this.drops[i].max = total_rate
		}
	}
	
	gachaForItem(rolled){
		for (var i in this.drops) {
			if (rolled<=this.drops[i].max)
				return this.drops[i].item;
		}
	}
	
	insertCoin(numTries){
		if(isNaN(numTries))	return "Please choose a proper number!";
		let allRolls = "";
		for(var tries=0;tries<numTries;tries++){
			let randno = Math.random() * 100;
			allRolls += ("1 x "+this.gachaForItem(randno)+", ");
		}
		allRolls = allRolls.slice(0,-2);
		return allRolls;
	}
	
	buyXMasBox(){
		return "You received Large Pet Exp Potion x 10, Colorful Shell x 300"+((Math.random()<=0.1)?", Red Nose Rudolph x 1":"");
	}
}
	


