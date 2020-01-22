<template>
  <div>
    <table class="table table-dark table-bordered mt-12" style='width:90%;margin-left:5%'>
      <tr style='border-bottom:3px solid grey'>
        <td style='border-right:none;text-align:center;font-size:24px;font-weight:600;'>
          <span>Score</span>
        </td>
        <td colspan="4" style='border-left:none;text-align:center;font-size:24px;font-weight:600;'>
          <span>{{score}}</span>
        </td>
      </tr>
      <tr v-for="mass in myMass" :key='mass.id' style='text-align:center;font-size:24px;font-weight:600;'>
        <td v-for="elem in mass" :key="elem.id" style='width:20%'>
          <span v-if="elem!=0" class='red--text'>{{elem}}</span>
          <span v-else>{{elem}}</span>
        </td>
      </tr>
      <tr>
        <td v-if='winner==true' colspan="5" class='green--text' style='border:2px solid green;text-align:center;font-size:24px;font-weight:500;'>
          <span>Вы победили! Поздравляю! <br> Вы можете продолжить играть в бесконечным режиме, удачи! :)</span>
        </td>
      </tr>
    </table>

    <table class="table table-borderless mt-0" style='width:90%;margin-left:5%'>
      <tr>
        <td style='width:50px'>
          <v-btn fab dark class="btnnovue" @click="moveLeft()">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </td>
        <td style='width:50px'>
          <v-btn fab dark class="btnnovue" @click='moveRight()'>
            <v-icon>chevron_right</v-icon>
          </v-btn>
        </td>
        <td style='width:50px'>
          <v-btn fab dark class="btnnovue" @click="moveUp()">
            <v-icon>expand_less</v-icon>
          </v-btn>
        </td>
        <td style='width:50px'>
          <v-btn fab dark class="btnnovue" @click="moveDown()">
            <v-icon>expand_more</v-icon>
          </v-btn>
        </td>
        <td style='width:100%;text-align:right;vertical-align: middle;'>
          <v-btn dark class="btnnovue" @click="renderMass()">
            <v-icon class='mr-2'>refresh</v-icon>
            <span>Refresh</span>
          </v-btn>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data: () => ({
    myMass:[0,1,2,3,4],
    moveChecker:0,
    score:0,
    winner:false,
  }),


  mounted() {
    this.renderMass();
  },

  methods:{
    /* eslint-disable no-unused-vars */
    RandomIntEven(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      let outputInt;
      outputInt = Math.floor(Math.random() * (max - min + 1)) + min;
      return outputInt; 
    },
    renderMass(){
      let x =[];
      this.myMass=[];
      this.score=0;
      let randElem = 0;
      let q=-1
      let p=-1

      for(let i=0;i<5;i++){
        for(let j=0;j<5;j++){
        x.push(0);
        }
        this.myMass.push(x)
        x=[]
      }
      for(let z=0;z<2;){
        if(Math.random()<0.2){
          randElem=4
        }
        else{
          randElem=2
        }
        let rand1 = this.RandomIntEven(0,4)
        let rand2 = this.RandomIntEven(0,4)
        if(q != rand1 && p != rand2){
          q = rand1
          p = rand2
          this.$set(this.myMass[q],[p],randElem)
          z++
        }
      }
    },

  checkerWin(){
    for(let i=0;i<5;i++){
        for(let j=0;j<5;j++){
          if(this.myMass[i][j]==2048){
            this.winner=true;
          }
        }
      }
    },

    renderElem(moveWhere){
      let randElem = 0;
      let counter = 0;
      let loseCout = 0;
      let q = -1;
      let p = -1;
      

      for(let z=0;z<5;z++){
        if(this.myMass[z].indexOf(0) == -1){
          loseCout++
          if(loseCout==5){
            return alert('You lose! Press button "Refresh"')
          }

        }
      }

      if(this.moveChecker==0){
        return alert("Движение " + moveWhere + " не дает никаких результатов, попробуйте другие направления :)")
      }

      for(let z=0;z<1;){
        if(Math.random()<0.22){
          randElem=4
        }
        else{
          randElem=2
        }
        let rand1 = this.RandomIntEven(0,4)
        let rand2 = this.RandomIntEven(0,4)
        if(q != rand1 && p != rand2 && this.myMass[rand1][rand2] == 0){
          q = rand1
          p = rand2
          this.$set(this.myMass[q],[p],randElem)
          z++
        }
      }
      this.checkerWin();
    },

    moveLeft(){
      this.moveChecker=0;
      for(let i=0;i<5;i++){
        for(let j=1;j<5;j++){
            if(this.myMass[i][j]!=0){
              if(this.myMass[i][j-1]==0){
                this.moveChecker = 1
              }
              let counter = 1
              let counter2 = 0
              while(this.myMass[i][j-counter]==0){
                this.$set(this.myMass[i],[j-counter],this.myMass[i][j-counter2])
                this.$set(this.myMass[i],[j-counter2],0)
                counter++
                counter2++
              }
              if(this.myMass[i][j-counter]==this.myMass[i][j-counter2]){
                this.$set(this.myMass[i],[j-counter],this.myMass[i][j-counter]+this.myMass[i][j-counter2])
                this.$set(this.myMass[i],[j-counter2],0)
                this.score+=this.myMass[i][j-counter]+this.myMass[i][j-counter2];
                this.moveChecker = 1
              }
            }
        }
      }
    this.renderElem("влево")
    },

    moveRight(){
      this.moveChecker=0;
      for(let i=4;i>=0;i--){
        for(let j=3;j>=0;j--){
            if(this.myMass[i][j]!=0){
              if(this.myMass[i][j+1]==0){
                this.moveChecker = 1
              }
              let counter = 1
              while(this.myMass[i][j+counter]==0){
                counter++
              }
                this.$set(this.myMass[i],[j+counter-1],this.myMass[i][j])
                if(counter!=1){
                  this.$set(this.myMass[i],[j],0)
                }
              if(this.myMass[i][j+counter-1]==this.myMass[i][j+counter]){
                this.$set(this.myMass[i],[j+counter],this.myMass[i][j+counter-1]+this.myMass[i][j+counter])
                this.$set(this.myMass[i],[j+counter-1],0)
                this.score+=this.myMass[i][j+counter-1]+this.myMass[i][j+counter];
                this.moveChecker = 1
              }
            }
        }
      }
    this.renderElem("вправо")
    },

    moveUp(){
      this.moveChecker=0;
      
      for(let j=0;j<5;j++){
        for(let i=1;i<5;i++){
          if(this.myMass[i][j] != 0){
            if(this.myMass[i-1][j]==0){
              this.moveChecker = 1
            }
            let x = 0
            for(let z=1;i-z>-1;z++){
              if(this.myMass[i-z][j]==0){
                x++
              }
            }
            this.$set(this.myMass[i-x],[j],this.myMass[i][j])
            if(x!=0){
              this.$set(this.myMass[i],[j],0)
            }

            if(i-x-1>-1){
              if(this.myMass[i-x-1][j]==this.myMass[i-x][j]){
                this.$set(this.myMass[i-x-1],[j],this.myMass[i-x-1][j]+this.myMass[i-x][j])
                this.$set(this.myMass[i-x],[j],0)
                this.score+=this.myMass[i-x-1][j]+this.myMass[i-x][j]
                this.moveChecker = 1
              }
            }
          }
        }
      }
      
    this.renderElem("вверх")
    },

    moveDown(){
      this.moveChecker=0;
      
      for(let j=0;j<5;j++){
        for(let i=4;i>=0;i--){
          if(this.myMass[i][j] != 0){
            if(i+1<5){
              if(this.myMass[i+1][j]==0){
                this.moveChecker = 1
              }
            }
            let x = 0
            for(let z=1;i+z<5;z++){
              if(this.myMass[i+z][j]==0){
                x++
              }
            }
            this.$set(this.myMass[i+x],[j],this.myMass[i][j])
            if(x!=0){
              this.$set(this.myMass[i],[j],0)
            }

            if(i+x+1<5){
              if(this.myMass[i+x+1][j]==this.myMass[i+x][j]){
                this.$set(this.myMass[i+x+1],[j],this.myMass[i+x+1][j]+this.myMass[i+x][j])
                this.$set(this.myMass[i+x],[j],0)
                this.score+=this.myMass[i+x+1][j]+this.myMass[i+x][j]
                this.moveChecker = 1
              }
            }
          }
        }
      }
      
    this.renderElem("вниз")
    },
  }
}
</script>
