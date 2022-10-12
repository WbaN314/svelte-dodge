<script lang="ts">
  import Dodge from "../lib/Dodge.svelte";

  let button1 = { w: 100, h: 100 };
  let button2 = { bottom: 100 };
</script>

<div class="container">

  <div class="cell">
    <Dodge debug>
      <div
        class="test"
        style={`
          width: ${button1.w}px;
          height: ${button1.h}px;
        `}
        on:click={() => {
          if (button1.w == 100) {
            button1.w = 200;
          } else {
            button1.w = 100;
          }
        }}
      >
        <div>
          {`h: ${button1.h}`}
        </div>
        <div>
          {`w: ${button1.w}`}
        </div>
      </div>
    </Dodge>
  </div>

  <div class="cell">
    <Dodge debug>
      <div
        class="test"
        style={`
          margin-bottom: ${button2.bottom}px;
        `}
        on:click={() => {
          if (button2.bottom == 100) {
            button2.bottom = 0;
          } else {
            button2.bottom = 100;
          }
        }}
      >
        <div>
          {`margin-bottom: ${button2.bottom}`}
        </div>
      </div>
    </Dodge>
  </div>

  <div class="cell">
    <Dodge debug box={{ up: 0, right: 140, left: 140, down: 0 }} mode={"random-away"}>
      <div class="test" />
    </Dodge>
  </div>

  <div class="cell">
    <Dodge
      debug
      box={{ up: 0, right: 160, left: 160, down: 0 }}
      activationDistance={60}
    >
      <div class="test" />
    </Dodge>
  </div>
</div>

<style>
  .test {
    width: 100px;
    height: 100px;
    overflow-wrap: break-word;
  }

  .cell {
    background-color: rgb(200, 200, 200);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    width: 100vw;
    height: 100vh;
    display: grid;
    align-items: stretch;
    justify-items: stretch;
    gap: 8px;
    grid-template-columns: 1fr 1fr;
  }
</style>
