import { S as SvelteComponent, i as init, s as safe_not_equal, e as empty, b as insert_hydration, J as update_keyed_each, C as noop, h as detach, I as component_subscribe, k as element, l as claim_element, m as children, n as attr, K as listen, L as destroy_block, M as set_store_value, q as text, r as claim_text, H as append_hydration, a as space, x as create_component, c as claim_space, y as claim_component, p as set_style, z as mount_component, u as set_data, f as transition_in, t as transition_out, A as destroy_component, N as run_all } from "../../chunks/index-62fc4467.js";
import { w as writable } from "../../chunks/index-e8229399.js";
const dices = writable([
  1,
  1,
  1,
  1,
  1
]);
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[3] = list[i];
  child_ctx[5] = i;
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[3] = list[i];
  child_ctx[7] = i;
  return child_ctx;
}
function create_each_block_1(key_1, ctx) {
  let option;
  let t_value = (
    /*rollIndex*/
    ctx[7] + 1 + ""
  );
  let t;
  return {
    key: key_1,
    first: null,
    c() {
      option = element("option");
      t = text(t_value);
      this.h();
    },
    l(nodes) {
      option = claim_element(nodes, "OPTION", {});
      var option_nodes = children(option);
      t = claim_text(option_nodes, t_value);
      option_nodes.forEach(detach);
      this.h();
    },
    h() {
      option.__value = /*rollIndex*/
      ctx[7] + 1;
      option.value = option.__value;
      this.first = option;
    },
    m(target, anchor) {
      insert_hydration(target, option, anchor);
      append_hydration(option, t);
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(option);
    }
  };
}
function create_each_block(key_1, ctx) {
  let select;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let mounted;
  let dispose;
  let each_value_1 = Array(6);
  const get_key = (ctx2) => (
    /*rollIndex*/
    ctx2[7]
  );
  for (let i = 0; i < each_value_1.length; i += 1) {
    let child_ctx = get_each_context_1(ctx, each_value_1, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block_1(key, child_ctx));
  }
  return {
    key: key_1,
    first: null,
    c() {
      select = element("select");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      select = claim_element(nodes, "SELECT", { id: true, class: true });
      var select_nodes = children(select);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(select_nodes);
      }
      select_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(select, "id", "dice-" + /*diceIndex*/
      (ctx[5] + 1));
      attr(select, "class", "dice");
      this.first = select;
    },
    m(target, anchor) {
      insert_hydration(target, select, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(select, null);
      }
      if (!mounted) {
        dispose = listen(
          select,
          "change",
          /*updateDiceStore*/
          ctx[0]
        );
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*Array*/
      0) {
        each_value_1 = Array(6);
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_1, each_1_lookup, select, destroy_block, create_each_block_1, null, get_each_context_1);
      }
    },
    d(detaching) {
      if (detaching)
        detach(select);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$1(ctx) {
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let each_1_anchor;
  let each_value = Array(5);
  const get_key = (ctx2) => (
    /*diceIndex*/
    ctx2[5]
  );
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
  }
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    l(nodes) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert_hydration(target, each_1_anchor, anchor);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*Array, updateDiceStore*/
      1) {
        each_value = Array(5);
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, each_1_anchor.parentNode, destroy_block, create_each_block, each_1_anchor, get_each_context);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d(detaching);
      }
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let $DiceStore;
  component_subscribe($$self, dices, ($$value) => $$invalidate(1, $DiceStore = $$value));
  function updateDiceStore() {
    const dices$1 = getDices();
    set_store_value(dices, $DiceStore = dices$1, $DiceStore);
  }
  const getDices = () => {
    let dices2 = [];
    const diceNodeList = document.querySelectorAll(".dice");
    diceNodeList.forEach((dice) => {
      dices2.push(Number(dice.value));
    });
    return dices2;
  };
  return [updateDiceStore];
}
class Dice extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
  }
}
const hands = writable({
  "ONE": {
    "recorded_points": 0,
    "is_recorded": false
  },
  "TWO": {
    "recorded_points": 0,
    "is_recorded": false
  },
  "THREE": {
    "recorded_points": 0,
    "is_recorded": false
  },
  "FOUR": {
    "recorded_points": 0,
    "is_recorded": false
  },
  "FIVE": {
    "recorded_points": 0,
    "is_recorded": false
  },
  "SIX": {
    "recorded_points": 0,
    "is_recorded": false
  },
  "BONUS": {
    "recorded_points": 0,
    "is_recorded": false
  },
  "THREE_CARD": {
    "recorded_points": 0,
    "is_recorded": false
  },
  "FOUR_CARD": {
    "recorded_points": 0,
    "is_recorded": false
  },
  "FULL_HOUSE": {
    "recorded_points": 0,
    "is_recorded": false
  },
  "SMALL_STRAIGHT": {
    "recorded_points": 0,
    "is_recorded": false
  },
  "BIG_STRAIGHT": {
    "recorded_points": 0,
    "is_recorded": false
  },
  "FOUR_CARD": {
    "recorded_points": 0,
    "is_recorded": false
  },
  "YAHTZEE": {
    "recorded_points": 0,
    "is_recorded": false
  },
  "CHANCE": {
    "recorded_points": 0,
    "is_recorded": false
  }
});
const tempHands = writable({
  "ONE": {
    "points": 0
  },
  "TWO": {
    "points": 0
  },
  "THREE": {
    "points": 0
  },
  "FOUR": {
    "points": 0
  },
  "FIVE": {
    "points": 0
  },
  "SIX": {
    "points": 0
  },
  "BONUS": {
    "points": 0
  },
  "THREE_CARD": {
    "points": 0
  },
  "FOUR_CARD": {
    "points": 0
  },
  "FULL_HOUSE": {
    "points": 0
  },
  "SMALL_STRAIGHT": {
    "points": 0
  },
  "BIG_STRAIGHT": {
    "points": 0
  },
  "FOUR_CARD": {
    "points": 0
  },
  "YAHTZEE": {
    "points": 0
  },
  "CHANCE": {
    "points": 0
  }
});
const _page_svelte_svelte_type_style_lang = "";
function create_else_block(ctx) {
  let a;
  let t0;
  let t1;
  let t2;
  return {
    c() {
      a = element("a");
      t0 = text("ボーナスまであと");
      t1 = text(
        /*toGetBonus*/
        ctx[3]
      );
      t2 = text("点");
      this.h();
    },
    l(nodes) {
      a = claim_element(nodes, "A", { class: true, href: true });
      var a_nodes = children(a);
      t0 = claim_text(a_nodes, "ボーナスまであと");
      t1 = claim_text(
        a_nodes,
        /*toGetBonus*/
        ctx[3]
      );
      t2 = claim_text(a_nodes, "点");
      a_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(a, "class", "point-cell-event-handler 'not-recorded point-cell-event-handler--not-clickable svelte-1q9llg6");
      attr(a, "href", "#");
    },
    m(target, anchor) {
      insert_hydration(target, a, anchor);
      append_hydration(a, t0);
      append_hydration(a, t1);
      append_hydration(a, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*toGetBonus*/
      8)
        set_data(
          t1,
          /*toGetBonus*/
          ctx2[3]
        );
    },
    d(detaching) {
      if (detaching)
        detach(a);
    }
  };
}
function create_if_block(ctx) {
  let a;
  let t_value = (
    /*$HandsStore*/
    ctx[0].BONUS.recorded_points + ""
  );
  let t;
  return {
    c() {
      a = element("a");
      t = text(t_value);
      this.h();
    },
    l(nodes) {
      a = claim_element(nodes, "A", { class: true, href: true });
      var a_nodes = children(a);
      t = claim_text(a_nodes, t_value);
      a_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(a, "class", "point-cell-event-handler 'recorded' point-cell-event-handler--not-clickable svelte-1q9llg6");
      attr(a, "href", "#");
    },
    m(target, anchor) {
      insert_hydration(target, a, anchor);
      append_hydration(a, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*$HandsStore*/
      1 && t_value !== (t_value = /*$HandsStore*/
      ctx2[0].BONUS.recorded_points + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(a);
    }
  };
}
function create_fragment(ctx) {
  let div4;
  let div0;
  let h3;
  let t0;
  let t1;
  let div2;
  let div1;
  let dice;
  let t2;
  let div3;
  let table;
  let tbody;
  let tr0;
  let th0;
  let t3;
  let th1;
  let t4;
  let t5;
  let tr1;
  let th2;
  let span0;
  let t6;
  let t7;
  let br0;
  let t8;
  let span1;
  let t9;
  let t10;
  let td0;
  let a0;
  let t11_value = (
    /*$HandsStore*/
    (ctx[0].ONE.is_recorded ? (
      /*$HandsStore*/
      ctx[0].ONE.recorded_points
    ) : (
      /*$TempHandsStore*/
      ctx[1].ONE.points
    )) + ""
  );
  let t11;
  let a0_class_value;
  let t12;
  let tr2;
  let th3;
  let span2;
  let t13;
  let t14;
  let br1;
  let t15;
  let span3;
  let t16;
  let t17;
  let td1;
  let a1;
  let t18_value = (
    /*$HandsStore*/
    (ctx[0].TWO.is_recorded ? (
      /*$HandsStore*/
      ctx[0].TWO.recorded_points
    ) : (
      /*$TempHandsStore*/
      ctx[1].TWO.points
    )) + ""
  );
  let t18;
  let a1_class_value;
  let t19;
  let tr3;
  let th4;
  let span4;
  let t20;
  let t21;
  let br2;
  let t22;
  let span5;
  let t23;
  let t24;
  let td2;
  let a2;
  let t25_value = (
    /*$HandsStore*/
    (ctx[0].THREE.is_recorded ? (
      /*$HandsStore*/
      ctx[0].THREE.recorded_points
    ) : (
      /*$TempHandsStore*/
      ctx[1].THREE.points
    )) + ""
  );
  let t25;
  let a2_class_value;
  let t26;
  let tr4;
  let th5;
  let span6;
  let t27;
  let t28;
  let br3;
  let t29;
  let span7;
  let t30;
  let t31;
  let td3;
  let a3;
  let t32_value = (
    /*$HandsStore*/
    (ctx[0].FOUR.is_recorded ? (
      /*$HandsStore*/
      ctx[0].FOUR.recorded_points
    ) : (
      /*$TempHandsStore*/
      ctx[1].FOUR.points
    )) + ""
  );
  let t32;
  let a3_class_value;
  let t33;
  let tr5;
  let th6;
  let span8;
  let t34;
  let t35;
  let br4;
  let t36;
  let span9;
  let t37;
  let t38;
  let td4;
  let a4;
  let t39_value = (
    /*$HandsStore*/
    (ctx[0].FIVE.is_recorded ? (
      /*$HandsStore*/
      ctx[0].FIVE.recorded_points
    ) : (
      /*$TempHandsStore*/
      ctx[1].FIVE.points
    )) + ""
  );
  let t39;
  let a4_class_value;
  let t40;
  let tr6;
  let th7;
  let span10;
  let t41;
  let t42;
  let br5;
  let t43;
  let span11;
  let t44;
  let t45;
  let td5;
  let a5;
  let t46_value = (
    /*$HandsStore*/
    (ctx[0].SIX.is_recorded ? (
      /*$HandsStore*/
      ctx[0].SIX.recorded_points
    ) : (
      /*$TempHandsStore*/
      ctx[1].SIX.points
    )) + ""
  );
  let t46;
  let a5_class_value;
  let t47;
  let tr7;
  let th8;
  let span12;
  let t48;
  let t49;
  let br6;
  let t50;
  let span13;
  let t51;
  let t52;
  let td6;
  let t53;
  let tr8;
  let t54;
  let tr9;
  let th9;
  let span14;
  let t55;
  let t56;
  let br7;
  let t57;
  let span15;
  let t58;
  let t59;
  let td7;
  let a6;
  let t60_value = (
    /*$HandsStore*/
    (ctx[0].THREE_CARD.is_recorded ? (
      /*$HandsStore*/
      ctx[0].THREE_CARD.recorded_points
    ) : (
      /*$TempHandsStore*/
      ctx[1].THREE_CARD.points
    )) + ""
  );
  let t60;
  let a6_class_value;
  let t61;
  let tr10;
  let th10;
  let span16;
  let t62;
  let t63;
  let br8;
  let t64;
  let span17;
  let t65;
  let t66;
  let td8;
  let a7;
  let t67_value = (
    /*$HandsStore*/
    (ctx[0].FOUR_CARD.is_recorded ? (
      /*$HandsStore*/
      ctx[0].FOUR_CARD.recorded_points
    ) : (
      /*$TempHandsStore*/
      ctx[1].FOUR_CARD.points
    )) + ""
  );
  let t67;
  let a7_class_value;
  let t68;
  let tr11;
  let th11;
  let span18;
  let t69;
  let t70;
  let br9;
  let t71;
  let span19;
  let t72;
  let t73;
  let td9;
  let a8;
  let t74_value = (
    /*$HandsStore*/
    (ctx[0].FULL_HOUSE.is_recorded ? (
      /*$HandsStore*/
      ctx[0].FULL_HOUSE.recorded_points
    ) : (
      /*$TempHandsStore*/
      ctx[1].FULL_HOUSE.points
    )) + ""
  );
  let t74;
  let a8_class_value;
  let t75;
  let tr12;
  let th12;
  let span20;
  let t76;
  let t77;
  let br10;
  let t78;
  let span21;
  let t79;
  let t80;
  let td10;
  let a9;
  let t81_value = (
    /*$HandsStore*/
    (ctx[0].SMALL_STRAIGHT.is_recorded ? (
      /*$HandsStore*/
      ctx[0].SMALL_STRAIGHT.recorded_points
    ) : (
      /*$TempHandsStore*/
      ctx[1].SMALL_STRAIGHT.points
    )) + ""
  );
  let t81;
  let a9_class_value;
  let t82;
  let tr13;
  let th13;
  let span22;
  let t83;
  let t84;
  let br11;
  let t85;
  let span23;
  let t86;
  let t87;
  let td11;
  let a10;
  let t88_value = (
    /*$HandsStore*/
    (ctx[0].BIG_STRAIGHT.is_recorded ? (
      /*$HandsStore*/
      ctx[0].BIG_STRAIGHT.recorded_points
    ) : (
      /*$TempHandsStore*/
      ctx[1].BIG_STRAIGHT.points
    )) + ""
  );
  let t88;
  let a10_class_value;
  let t89;
  let tr14;
  let th14;
  let span24;
  let t90;
  let t91;
  let br12;
  let t92;
  let span25;
  let t93;
  let t94;
  let td12;
  let a11;
  let t95_value = (
    /*$HandsStore*/
    (ctx[0].YAHTZEE.is_recorded ? (
      /*$HandsStore*/
      ctx[0].YAHTZEE.recorded_points
    ) : (
      /*$TempHandsStore*/
      ctx[1].YAHTZEE.points
    )) + ""
  );
  let t95;
  let a11_class_value;
  let t96;
  let tr15;
  let th15;
  let span26;
  let t97;
  let t98;
  let br13;
  let t99;
  let span27;
  let t100;
  let t101;
  let td13;
  let a12;
  let t102_value = (
    /*$HandsStore*/
    (ctx[0].CHANCE.is_recorded ? (
      /*$HandsStore*/
      ctx[0].CHANCE.recorded_points
    ) : (
      /*$TempHandsStore*/
      ctx[1].CHANCE.points
    )) + ""
  );
  let t102;
  let a12_class_value;
  let t103;
  let tr16;
  let th16;
  let span28;
  let t104;
  let t105;
  let td14;
  let a13;
  let t106;
  let current;
  let mounted;
  let dispose;
  dice = new Dice({});
  function select_block_type(ctx2, dirty) {
    if (
      /*$HandsStore*/
      ctx2[0].BONUS.is_recorded
    )
      return create_if_block;
    return create_else_block;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div4 = element("div");
      div0 = element("div");
      h3 = element("h3");
      t0 = text("サイコロを振り直し、結果を入力してください。");
      t1 = space();
      div2 = element("div");
      div1 = element("div");
      create_component(dice.$$.fragment);
      t2 = space();
      div3 = element("div");
      table = element("table");
      tbody = element("tbody");
      tr0 = element("tr");
      th0 = element("th");
      t3 = space();
      th1 = element("th");
      t4 = text("点数");
      t5 = space();
      tr1 = element("tr");
      th2 = element("th");
      span0 = element("span");
      t6 = text("1の目");
      t7 = space();
      br0 = element("br");
      t8 = space();
      span1 = element("span");
      t9 = text("該当する目の合計");
      t10 = space();
      td0 = element("td");
      a0 = element("a");
      t11 = text(t11_value);
      t12 = space();
      tr2 = element("tr");
      th3 = element("th");
      span2 = element("span");
      t13 = text("2の目");
      t14 = space();
      br1 = element("br");
      t15 = space();
      span3 = element("span");
      t16 = text("該当する目の合計");
      t17 = space();
      td1 = element("td");
      a1 = element("a");
      t18 = text(t18_value);
      t19 = space();
      tr3 = element("tr");
      th4 = element("th");
      span4 = element("span");
      t20 = text("3の目");
      t21 = space();
      br2 = element("br");
      t22 = space();
      span5 = element("span");
      t23 = text("該当する目の合計");
      t24 = space();
      td2 = element("td");
      a2 = element("a");
      t25 = text(t25_value);
      t26 = space();
      tr4 = element("tr");
      th5 = element("th");
      span6 = element("span");
      t27 = text("4の目");
      t28 = space();
      br3 = element("br");
      t29 = space();
      span7 = element("span");
      t30 = text("該当する目の合計");
      t31 = space();
      td3 = element("td");
      a3 = element("a");
      t32 = text(t32_value);
      t33 = space();
      tr5 = element("tr");
      th6 = element("th");
      span8 = element("span");
      t34 = text("5の目");
      t35 = space();
      br4 = element("br");
      t36 = space();
      span9 = element("span");
      t37 = text("該当する目の合計");
      t38 = space();
      td4 = element("td");
      a4 = element("a");
      t39 = text(t39_value);
      t40 = space();
      tr6 = element("tr");
      th7 = element("th");
      span10 = element("span");
      t41 = text("6の目");
      t42 = space();
      br5 = element("br");
      t43 = space();
      span11 = element("span");
      t44 = text("該当する目の合計");
      t45 = space();
      td5 = element("td");
      a5 = element("a");
      t46 = text(t46_value);
      t47 = space();
      tr7 = element("tr");
      th8 = element("th");
      span12 = element("span");
      t48 = text("ボーナス");
      t49 = space();
      br6 = element("br");
      t50 = space();
      span13 = element("span");
      t51 = text("1~6の目の合計が63点以上の場合+35点");
      t52 = space();
      td6 = element("td");
      if_block.c();
      t53 = space();
      tr8 = element("tr");
      t54 = space();
      tr9 = element("tr");
      th9 = element("th");
      span14 = element("span");
      t55 = text("3カード");
      t56 = space();
      br7 = element("br");
      t57 = space();
      span15 = element("span");
      t58 = text("出目の合計");
      t59 = space();
      td7 = element("td");
      a6 = element("a");
      t60 = text(t60_value);
      t61 = space();
      tr10 = element("tr");
      th10 = element("th");
      span16 = element("span");
      t62 = text("4カード");
      t63 = space();
      br8 = element("br");
      t64 = space();
      span17 = element("span");
      t65 = text("出目の合計");
      t66 = space();
      td8 = element("td");
      a7 = element("a");
      t67 = text(t67_value);
      t68 = space();
      tr11 = element("tr");
      th11 = element("th");
      span18 = element("span");
      t69 = text("フルハウス");
      t70 = space();
      br9 = element("br");
      t71 = space();
      span19 = element("span");
      t72 = text("25点");
      t73 = space();
      td9 = element("td");
      a8 = element("a");
      t74 = text(t74_value);
      t75 = space();
      tr12 = element("tr");
      th12 = element("th");
      span20 = element("span");
      t76 = text("小さいストレート");
      t77 = space();
      br10 = element("br");
      t78 = space();
      span21 = element("span");
      t79 = text("30点");
      t80 = space();
      td10 = element("td");
      a9 = element("a");
      t81 = text(t81_value);
      t82 = space();
      tr13 = element("tr");
      th13 = element("th");
      span22 = element("span");
      t83 = text("大きいストレート");
      t84 = space();
      br11 = element("br");
      t85 = space();
      span23 = element("span");
      t86 = text("40点");
      t87 = space();
      td11 = element("td");
      a10 = element("a");
      t88 = text(t88_value);
      t89 = space();
      tr14 = element("tr");
      th14 = element("th");
      span24 = element("span");
      t90 = text("ヤッツィー");
      t91 = space();
      br12 = element("br");
      t92 = space();
      span25 = element("span");
      t93 = text("50点");
      t94 = space();
      td12 = element("td");
      a11 = element("a");
      t95 = text(t95_value);
      t96 = space();
      tr15 = element("tr");
      th15 = element("th");
      span26 = element("span");
      t97 = text("チャンス");
      t98 = space();
      br13 = element("br");
      t99 = space();
      span27 = element("span");
      t100 = text("サイコロの目の合計");
      t101 = space();
      td13 = element("td");
      a12 = element("a");
      t102 = text(t102_value);
      t103 = space();
      tr16 = element("tr");
      th16 = element("th");
      span28 = element("span");
      t104 = text("合計点");
      t105 = space();
      td14 = element("td");
      a13 = element("a");
      t106 = text(
        /*sumOfPoints*/
        ctx[2]
      );
      this.h();
    },
    l(nodes) {
      div4 = claim_element(nodes, "DIV", { class: true });
      var div4_nodes = children(div4);
      div0 = claim_element(div4_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      h3 = claim_element(div0_nodes, "H3", {});
      var h3_nodes = children(h3);
      t0 = claim_text(h3_nodes, "サイコロを振り直し、結果を入力してください。");
      h3_nodes.forEach(detach);
      div0_nodes.forEach(detach);
      t1 = claim_space(div4_nodes);
      div2 = claim_element(div4_nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", { class: true, style: true });
      var div1_nodes = children(div1);
      claim_component(dice.$$.fragment, div1_nodes);
      div1_nodes.forEach(detach);
      div2_nodes.forEach(detach);
      t2 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", { class: true });
      var div3_nodes = children(div3);
      table = claim_element(div3_nodes, "TABLE", { class: true });
      var table_nodes = children(table);
      tbody = claim_element(table_nodes, "TBODY", {});
      var tbody_nodes = children(tbody);
      tr0 = claim_element(tbody_nodes, "TR", {});
      var tr0_nodes = children(tr0);
      th0 = claim_element(tr0_nodes, "TH", {});
      children(th0).forEach(detach);
      t3 = claim_space(tr0_nodes);
      th1 = claim_element(tr0_nodes, "TH", { class: true, scope: true });
      var th1_nodes = children(th1);
      t4 = claim_text(th1_nodes, "点数");
      th1_nodes.forEach(detach);
      tr0_nodes.forEach(detach);
      t5 = claim_space(tbody_nodes);
      tr1 = claim_element(tbody_nodes, "TR", { class: true });
      var tr1_nodes = children(tr1);
      th2 = claim_element(tr1_nodes, "TH", { scope: true, class: true });
      var th2_nodes = children(th2);
      span0 = claim_element(th2_nodes, "SPAN", { class: true });
      var span0_nodes = children(span0);
      t6 = claim_text(span0_nodes, "1の目");
      span0_nodes.forEach(detach);
      t7 = claim_space(th2_nodes);
      br0 = claim_element(th2_nodes, "BR", {});
      t8 = claim_space(th2_nodes);
      span1 = claim_element(th2_nodes, "SPAN", { class: true });
      var span1_nodes = children(span1);
      t9 = claim_text(span1_nodes, "該当する目の合計");
      span1_nodes.forEach(detach);
      th2_nodes.forEach(detach);
      t10 = claim_space(tr1_nodes);
      td0 = claim_element(tr1_nodes, "TD", { class: true });
      var td0_nodes = children(td0);
      a0 = claim_element(td0_nodes, "A", { class: true, href: true });
      var a0_nodes = children(a0);
      t11 = claim_text(a0_nodes, t11_value);
      a0_nodes.forEach(detach);
      td0_nodes.forEach(detach);
      tr1_nodes.forEach(detach);
      t12 = claim_space(tbody_nodes);
      tr2 = claim_element(tbody_nodes, "TR", { class: true });
      var tr2_nodes = children(tr2);
      th3 = claim_element(tr2_nodes, "TH", { scope: true });
      var th3_nodes = children(th3);
      span2 = claim_element(th3_nodes, "SPAN", { class: true });
      var span2_nodes = children(span2);
      t13 = claim_text(span2_nodes, "2の目");
      span2_nodes.forEach(detach);
      t14 = claim_space(th3_nodes);
      br1 = claim_element(th3_nodes, "BR", {});
      t15 = claim_space(th3_nodes);
      span3 = claim_element(th3_nodes, "SPAN", { class: true });
      var span3_nodes = children(span3);
      t16 = claim_text(span3_nodes, "該当する目の合計");
      span3_nodes.forEach(detach);
      th3_nodes.forEach(detach);
      t17 = claim_space(tr2_nodes);
      td1 = claim_element(tr2_nodes, "TD", { class: true });
      var td1_nodes = children(td1);
      a1 = claim_element(td1_nodes, "A", { class: true, href: true });
      var a1_nodes = children(a1);
      t18 = claim_text(a1_nodes, t18_value);
      a1_nodes.forEach(detach);
      td1_nodes.forEach(detach);
      tr2_nodes.forEach(detach);
      t19 = claim_space(tbody_nodes);
      tr3 = claim_element(tbody_nodes, "TR", { class: true });
      var tr3_nodes = children(tr3);
      th4 = claim_element(tr3_nodes, "TH", { scope: true });
      var th4_nodes = children(th4);
      span4 = claim_element(th4_nodes, "SPAN", { class: true });
      var span4_nodes = children(span4);
      t20 = claim_text(span4_nodes, "3の目");
      span4_nodes.forEach(detach);
      t21 = claim_space(th4_nodes);
      br2 = claim_element(th4_nodes, "BR", {});
      t22 = claim_space(th4_nodes);
      span5 = claim_element(th4_nodes, "SPAN", { class: true });
      var span5_nodes = children(span5);
      t23 = claim_text(span5_nodes, "該当する目の合計");
      span5_nodes.forEach(detach);
      th4_nodes.forEach(detach);
      t24 = claim_space(tr3_nodes);
      td2 = claim_element(tr3_nodes, "TD", { class: true });
      var td2_nodes = children(td2);
      a2 = claim_element(td2_nodes, "A", { class: true, href: true });
      var a2_nodes = children(a2);
      t25 = claim_text(a2_nodes, t25_value);
      a2_nodes.forEach(detach);
      td2_nodes.forEach(detach);
      tr3_nodes.forEach(detach);
      t26 = claim_space(tbody_nodes);
      tr4 = claim_element(tbody_nodes, "TR", { class: true });
      var tr4_nodes = children(tr4);
      th5 = claim_element(tr4_nodes, "TH", { scope: true });
      var th5_nodes = children(th5);
      span6 = claim_element(th5_nodes, "SPAN", { class: true });
      var span6_nodes = children(span6);
      t27 = claim_text(span6_nodes, "4の目");
      span6_nodes.forEach(detach);
      t28 = claim_space(th5_nodes);
      br3 = claim_element(th5_nodes, "BR", {});
      t29 = claim_space(th5_nodes);
      span7 = claim_element(th5_nodes, "SPAN", { class: true });
      var span7_nodes = children(span7);
      t30 = claim_text(span7_nodes, "該当する目の合計");
      span7_nodes.forEach(detach);
      th5_nodes.forEach(detach);
      t31 = claim_space(tr4_nodes);
      td3 = claim_element(tr4_nodes, "TD", { class: true });
      var td3_nodes = children(td3);
      a3 = claim_element(td3_nodes, "A", { class: true, href: true });
      var a3_nodes = children(a3);
      t32 = claim_text(a3_nodes, t32_value);
      a3_nodes.forEach(detach);
      td3_nodes.forEach(detach);
      tr4_nodes.forEach(detach);
      t33 = claim_space(tbody_nodes);
      tr5 = claim_element(tbody_nodes, "TR", { class: true });
      var tr5_nodes = children(tr5);
      th6 = claim_element(tr5_nodes, "TH", { scope: true });
      var th6_nodes = children(th6);
      span8 = claim_element(th6_nodes, "SPAN", { class: true });
      var span8_nodes = children(span8);
      t34 = claim_text(span8_nodes, "5の目");
      span8_nodes.forEach(detach);
      t35 = claim_space(th6_nodes);
      br4 = claim_element(th6_nodes, "BR", {});
      t36 = claim_space(th6_nodes);
      span9 = claim_element(th6_nodes, "SPAN", { class: true });
      var span9_nodes = children(span9);
      t37 = claim_text(span9_nodes, "該当する目の合計");
      span9_nodes.forEach(detach);
      th6_nodes.forEach(detach);
      t38 = claim_space(tr5_nodes);
      td4 = claim_element(tr5_nodes, "TD", { class: true });
      var td4_nodes = children(td4);
      a4 = claim_element(td4_nodes, "A", { class: true, href: true });
      var a4_nodes = children(a4);
      t39 = claim_text(a4_nodes, t39_value);
      a4_nodes.forEach(detach);
      td4_nodes.forEach(detach);
      tr5_nodes.forEach(detach);
      t40 = claim_space(tbody_nodes);
      tr6 = claim_element(tbody_nodes, "TR", { class: true });
      var tr6_nodes = children(tr6);
      th7 = claim_element(tr6_nodes, "TH", { scope: true });
      var th7_nodes = children(th7);
      span10 = claim_element(th7_nodes, "SPAN", { class: true });
      var span10_nodes = children(span10);
      t41 = claim_text(span10_nodes, "6の目");
      span10_nodes.forEach(detach);
      t42 = claim_space(th7_nodes);
      br5 = claim_element(th7_nodes, "BR", {});
      t43 = claim_space(th7_nodes);
      span11 = claim_element(th7_nodes, "SPAN", { class: true });
      var span11_nodes = children(span11);
      t44 = claim_text(span11_nodes, "該当する目の合計");
      span11_nodes.forEach(detach);
      th7_nodes.forEach(detach);
      t45 = claim_space(tr6_nodes);
      td5 = claim_element(tr6_nodes, "TD", { class: true });
      var td5_nodes = children(td5);
      a5 = claim_element(td5_nodes, "A", { class: true, href: true });
      var a5_nodes = children(a5);
      t46 = claim_text(a5_nodes, t46_value);
      a5_nodes.forEach(detach);
      td5_nodes.forEach(detach);
      tr6_nodes.forEach(detach);
      t47 = claim_space(tbody_nodes);
      tr7 = claim_element(tbody_nodes, "TR", { class: true });
      var tr7_nodes = children(tr7);
      th8 = claim_element(tr7_nodes, "TH", { scope: true });
      var th8_nodes = children(th8);
      span12 = claim_element(th8_nodes, "SPAN", { class: true });
      var span12_nodes = children(span12);
      t48 = claim_text(span12_nodes, "ボーナス");
      span12_nodes.forEach(detach);
      t49 = claim_space(th8_nodes);
      br6 = claim_element(th8_nodes, "BR", {});
      t50 = claim_space(th8_nodes);
      span13 = claim_element(th8_nodes, "SPAN", { class: true });
      var span13_nodes = children(span13);
      t51 = claim_text(span13_nodes, "1~6の目の合計が63点以上の場合+35点");
      span13_nodes.forEach(detach);
      th8_nodes.forEach(detach);
      t52 = claim_space(tr7_nodes);
      td6 = claim_element(tr7_nodes, "TD", { class: true });
      var td6_nodes = children(td6);
      if_block.l(td6_nodes);
      td6_nodes.forEach(detach);
      tr7_nodes.forEach(detach);
      t53 = claim_space(tbody_nodes);
      tr8 = claim_element(tbody_nodes, "TR", { class: true });
      children(tr8).forEach(detach);
      t54 = claim_space(tbody_nodes);
      tr9 = claim_element(tbody_nodes, "TR", { class: true });
      var tr9_nodes = children(tr9);
      th9 = claim_element(tr9_nodes, "TH", { scope: true });
      var th9_nodes = children(th9);
      span14 = claim_element(th9_nodes, "SPAN", { class: true });
      var span14_nodes = children(span14);
      t55 = claim_text(span14_nodes, "3カード");
      span14_nodes.forEach(detach);
      t56 = claim_space(th9_nodes);
      br7 = claim_element(th9_nodes, "BR", {});
      t57 = claim_space(th9_nodes);
      span15 = claim_element(th9_nodes, "SPAN", { class: true });
      var span15_nodes = children(span15);
      t58 = claim_text(span15_nodes, "出目の合計");
      span15_nodes.forEach(detach);
      th9_nodes.forEach(detach);
      t59 = claim_space(tr9_nodes);
      td7 = claim_element(tr9_nodes, "TD", { class: true });
      var td7_nodes = children(td7);
      a6 = claim_element(td7_nodes, "A", { class: true, href: true });
      var a6_nodes = children(a6);
      t60 = claim_text(a6_nodes, t60_value);
      a6_nodes.forEach(detach);
      td7_nodes.forEach(detach);
      tr9_nodes.forEach(detach);
      t61 = claim_space(tbody_nodes);
      tr10 = claim_element(tbody_nodes, "TR", { class: true });
      var tr10_nodes = children(tr10);
      th10 = claim_element(tr10_nodes, "TH", { scope: true });
      var th10_nodes = children(th10);
      span16 = claim_element(th10_nodes, "SPAN", { class: true });
      var span16_nodes = children(span16);
      t62 = claim_text(span16_nodes, "4カード");
      span16_nodes.forEach(detach);
      t63 = claim_space(th10_nodes);
      br8 = claim_element(th10_nodes, "BR", {});
      t64 = claim_space(th10_nodes);
      span17 = claim_element(th10_nodes, "SPAN", { class: true });
      var span17_nodes = children(span17);
      t65 = claim_text(span17_nodes, "出目の合計");
      span17_nodes.forEach(detach);
      th10_nodes.forEach(detach);
      t66 = claim_space(tr10_nodes);
      td8 = claim_element(tr10_nodes, "TD", { class: true });
      var td8_nodes = children(td8);
      a7 = claim_element(td8_nodes, "A", { class: true, href: true });
      var a7_nodes = children(a7);
      t67 = claim_text(a7_nodes, t67_value);
      a7_nodes.forEach(detach);
      td8_nodes.forEach(detach);
      tr10_nodes.forEach(detach);
      t68 = claim_space(tbody_nodes);
      tr11 = claim_element(tbody_nodes, "TR", { class: true });
      var tr11_nodes = children(tr11);
      th11 = claim_element(tr11_nodes, "TH", { scope: true });
      var th11_nodes = children(th11);
      span18 = claim_element(th11_nodes, "SPAN", { class: true });
      var span18_nodes = children(span18);
      t69 = claim_text(span18_nodes, "フルハウス");
      span18_nodes.forEach(detach);
      t70 = claim_space(th11_nodes);
      br9 = claim_element(th11_nodes, "BR", {});
      t71 = claim_space(th11_nodes);
      span19 = claim_element(th11_nodes, "SPAN", { class: true });
      var span19_nodes = children(span19);
      t72 = claim_text(span19_nodes, "25点");
      span19_nodes.forEach(detach);
      th11_nodes.forEach(detach);
      t73 = claim_space(tr11_nodes);
      td9 = claim_element(tr11_nodes, "TD", { class: true });
      var td9_nodes = children(td9);
      a8 = claim_element(td9_nodes, "A", { class: true, href: true });
      var a8_nodes = children(a8);
      t74 = claim_text(a8_nodes, t74_value);
      a8_nodes.forEach(detach);
      td9_nodes.forEach(detach);
      tr11_nodes.forEach(detach);
      t75 = claim_space(tbody_nodes);
      tr12 = claim_element(tbody_nodes, "TR", { class: true });
      var tr12_nodes = children(tr12);
      th12 = claim_element(tr12_nodes, "TH", { scope: true });
      var th12_nodes = children(th12);
      span20 = claim_element(th12_nodes, "SPAN", { class: true });
      var span20_nodes = children(span20);
      t76 = claim_text(span20_nodes, "小さいストレート");
      span20_nodes.forEach(detach);
      t77 = claim_space(th12_nodes);
      br10 = claim_element(th12_nodes, "BR", {});
      t78 = claim_space(th12_nodes);
      span21 = claim_element(th12_nodes, "SPAN", { class: true });
      var span21_nodes = children(span21);
      t79 = claim_text(span21_nodes, "30点");
      span21_nodes.forEach(detach);
      th12_nodes.forEach(detach);
      t80 = claim_space(tr12_nodes);
      td10 = claim_element(tr12_nodes, "TD", { class: true });
      var td10_nodes = children(td10);
      a9 = claim_element(td10_nodes, "A", { class: true, href: true });
      var a9_nodes = children(a9);
      t81 = claim_text(a9_nodes, t81_value);
      a9_nodes.forEach(detach);
      td10_nodes.forEach(detach);
      tr12_nodes.forEach(detach);
      t82 = claim_space(tbody_nodes);
      tr13 = claim_element(tbody_nodes, "TR", { class: true });
      var tr13_nodes = children(tr13);
      th13 = claim_element(tr13_nodes, "TH", { scope: true });
      var th13_nodes = children(th13);
      span22 = claim_element(th13_nodes, "SPAN", { class: true });
      var span22_nodes = children(span22);
      t83 = claim_text(span22_nodes, "大きいストレート");
      span22_nodes.forEach(detach);
      t84 = claim_space(th13_nodes);
      br11 = claim_element(th13_nodes, "BR", {});
      t85 = claim_space(th13_nodes);
      span23 = claim_element(th13_nodes, "SPAN", { class: true });
      var span23_nodes = children(span23);
      t86 = claim_text(span23_nodes, "40点");
      span23_nodes.forEach(detach);
      th13_nodes.forEach(detach);
      t87 = claim_space(tr13_nodes);
      td11 = claim_element(tr13_nodes, "TD", { class: true });
      var td11_nodes = children(td11);
      a10 = claim_element(td11_nodes, "A", { class: true, href: true });
      var a10_nodes = children(a10);
      t88 = claim_text(a10_nodes, t88_value);
      a10_nodes.forEach(detach);
      td11_nodes.forEach(detach);
      tr13_nodes.forEach(detach);
      t89 = claim_space(tbody_nodes);
      tr14 = claim_element(tbody_nodes, "TR", { class: true });
      var tr14_nodes = children(tr14);
      th14 = claim_element(tr14_nodes, "TH", { scope: true });
      var th14_nodes = children(th14);
      span24 = claim_element(th14_nodes, "SPAN", { class: true });
      var span24_nodes = children(span24);
      t90 = claim_text(span24_nodes, "ヤッツィー");
      span24_nodes.forEach(detach);
      t91 = claim_space(th14_nodes);
      br12 = claim_element(th14_nodes, "BR", {});
      t92 = claim_space(th14_nodes);
      span25 = claim_element(th14_nodes, "SPAN", { class: true });
      var span25_nodes = children(span25);
      t93 = claim_text(span25_nodes, "50点");
      span25_nodes.forEach(detach);
      th14_nodes.forEach(detach);
      t94 = claim_space(tr14_nodes);
      td12 = claim_element(tr14_nodes, "TD", { class: true });
      var td12_nodes = children(td12);
      a11 = claim_element(td12_nodes, "A", { class: true, href: true });
      var a11_nodes = children(a11);
      t95 = claim_text(a11_nodes, t95_value);
      a11_nodes.forEach(detach);
      td12_nodes.forEach(detach);
      tr14_nodes.forEach(detach);
      t96 = claim_space(tbody_nodes);
      tr15 = claim_element(tbody_nodes, "TR", { class: true });
      var tr15_nodes = children(tr15);
      th15 = claim_element(tr15_nodes, "TH", { scope: true });
      var th15_nodes = children(th15);
      span26 = claim_element(th15_nodes, "SPAN", { class: true });
      var span26_nodes = children(span26);
      t97 = claim_text(span26_nodes, "チャンス");
      span26_nodes.forEach(detach);
      t98 = claim_space(th15_nodes);
      br13 = claim_element(th15_nodes, "BR", {});
      t99 = claim_space(th15_nodes);
      span27 = claim_element(th15_nodes, "SPAN", { class: true });
      var span27_nodes = children(span27);
      t100 = claim_text(span27_nodes, "サイコロの目の合計");
      span27_nodes.forEach(detach);
      th15_nodes.forEach(detach);
      t101 = claim_space(tr15_nodes);
      td13 = claim_element(tr15_nodes, "TD", { class: true });
      var td13_nodes = children(td13);
      a12 = claim_element(td13_nodes, "A", { class: true, href: true });
      var a12_nodes = children(a12);
      t102 = claim_text(a12_nodes, t102_value);
      a12_nodes.forEach(detach);
      td13_nodes.forEach(detach);
      tr15_nodes.forEach(detach);
      t103 = claim_space(tbody_nodes);
      tr16 = claim_element(tbody_nodes, "TR", { class: true });
      var tr16_nodes = children(tr16);
      th16 = claim_element(tr16_nodes, "TH", { scope: true });
      var th16_nodes = children(th16);
      span28 = claim_element(th16_nodes, "SPAN", { class: true });
      var span28_nodes = children(span28);
      t104 = claim_text(span28_nodes, "合計点");
      span28_nodes.forEach(detach);
      th16_nodes.forEach(detach);
      t105 = claim_space(tr16_nodes);
      td14 = claim_element(tr16_nodes, "TD", { class: true });
      var td14_nodes = children(td14);
      a13 = claim_element(td14_nodes, "A", { class: true, href: true });
      var a13_nodes = children(a13);
      t106 = claim_text(
        a13_nodes,
        /*sumOfPoints*/
        ctx[2]
      );
      a13_nodes.forEach(detach);
      td14_nodes.forEach(detach);
      tr16_nodes.forEach(detach);
      tbody_nodes.forEach(detach);
      table_nodes.forEach(detach);
      div3_nodes.forEach(detach);
      div4_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "row player-name-wrapper mt-4");
      attr(div1, "class", "d-grid dice-container");
      set_style(div1, "grid-template-columns", "repeat(5, 1fr)");
      set_style(div1, "column-gap", "2rem");
      attr(div2, "class", "row dice-wrapper");
      attr(th1, "class", "text-center");
      attr(th1, "scope", "col");
      attr(span0, "class", "point-title");
      attr(span1, "class", "point-description");
      attr(th2, "scope", "row");
      attr(th2, "class", "text-bg-secondary");
      attr(a0, "class", a0_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx[0].ONE.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6");
      attr(a0, "href", "#");
      attr(td0, "class", "point-cell svelte-1q9llg6");
      attr(tr1, "class", "point-row");
      attr(span2, "class", "point-title");
      attr(span3, "class", "point-description");
      attr(th3, "scope", "row");
      attr(a1, "class", a1_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx[0].TWO.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6");
      attr(a1, "href", "#");
      attr(td1, "class", "point-cell svelte-1q9llg6");
      attr(tr2, "class", "point-row");
      attr(span4, "class", "point-title");
      attr(span5, "class", "point-description");
      attr(th4, "scope", "row");
      attr(a2, "class", a2_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx[0].THREE.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6");
      attr(a2, "href", "#");
      attr(td2, "class", "point-cell svelte-1q9llg6");
      attr(tr3, "class", "point-row");
      attr(span6, "class", "point-title");
      attr(span7, "class", "point-description");
      attr(th5, "scope", "row");
      attr(a3, "class", a3_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx[0].FOUR.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6");
      attr(a3, "href", "#");
      attr(td3, "class", "point-cell svelte-1q9llg6");
      attr(tr4, "class", "point-row");
      attr(span8, "class", "point-title");
      attr(span9, "class", "point-description");
      attr(th6, "scope", "row");
      attr(a4, "class", a4_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx[0].FIVE.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6");
      attr(a4, "href", "#");
      attr(td4, "class", "point-cell svelte-1q9llg6");
      attr(tr5, "class", "point-row");
      attr(span10, "class", "point-title");
      attr(span11, "class", "point-description");
      attr(th7, "scope", "row");
      attr(a5, "class", a5_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx[0].SIX.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6");
      attr(a5, "href", "#");
      attr(td5, "class", "point-cell svelte-1q9llg6");
      attr(tr6, "class", "point-row");
      attr(span12, "class", "point-title");
      attr(span13, "class", "point-description");
      attr(th8, "scope", "row");
      attr(td6, "class", "point-cell svelte-1q9llg6");
      attr(tr7, "class", "point-row");
      attr(tr8, "class", "empty-row");
      attr(span14, "class", "point-title");
      attr(span15, "class", "point-description");
      attr(th9, "scope", "row");
      attr(a6, "class", a6_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx[0].THREE_CARD.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6");
      attr(a6, "href", "#");
      attr(td7, "class", "point-cell svelte-1q9llg6");
      attr(tr9, "class", "point-row");
      attr(span16, "class", "point-title");
      attr(span17, "class", "point-description");
      attr(th10, "scope", "row");
      attr(a7, "class", a7_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx[0].FOUR_CARD.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6");
      attr(a7, "href", "#");
      attr(td8, "class", "point-cell svelte-1q9llg6");
      attr(tr10, "class", "point-row");
      attr(span18, "class", "point-title");
      attr(span19, "class", "point-description");
      attr(th11, "scope", "row");
      attr(a8, "class", a8_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx[0].FULL_HOUSE.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6");
      attr(a8, "href", "#");
      attr(td9, "class", "point-cell svelte-1q9llg6");
      attr(tr11, "class", "point-row");
      attr(span20, "class", "point-title");
      attr(span21, "class", "point-description");
      attr(th12, "scope", "row");
      attr(a9, "class", a9_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx[0].SMALL_STRAIGHT.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6");
      attr(a9, "href", "#");
      attr(td10, "class", "point-cell svelte-1q9llg6");
      attr(tr12, "class", "point-row");
      attr(span22, "class", "point-title");
      attr(span23, "class", "point-description");
      attr(th13, "scope", "row");
      attr(a10, "class", a10_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx[0].BIG_STRAIGHT.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6");
      attr(a10, "href", "#");
      attr(td11, "class", "point-cell svelte-1q9llg6");
      attr(tr13, "class", "point-row");
      attr(span24, "class", "point-title");
      attr(span25, "class", "point-description");
      attr(th14, "scope", "row");
      attr(a11, "class", a11_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx[0].YAHTZEE.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6");
      attr(a11, "href", "#");
      attr(td12, "class", "point-cell svelte-1q9llg6");
      attr(tr14, "class", "point-row");
      attr(span26, "class", "point-title");
      attr(span27, "class", "point-description");
      attr(th15, "scope", "row");
      attr(a12, "class", a12_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx[0].CHANCE.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6");
      attr(a12, "href", "#");
      attr(td13, "class", "point-cell svelte-1q9llg6");
      attr(tr15, "class", "point-row");
      attr(span28, "class", "point-title");
      attr(th16, "scope", "row");
      attr(a13, "class", "point-cell-event-handler point-cell-event-handler--not-clickable svelte-1q9llg6");
      attr(a13, "href", "#");
      attr(td14, "class", "point-cell svelte-1q9llg6");
      attr(tr16, "class", "point-row point-row--sum svelte-1q9llg6");
      attr(table, "class", "table table-bordered");
      attr(div3, "class", "row result-table mt-4");
      attr(div4, "class", "container-fluid");
    },
    m(target, anchor) {
      insert_hydration(target, div4, anchor);
      append_hydration(div4, div0);
      append_hydration(div0, h3);
      append_hydration(h3, t0);
      append_hydration(div4, t1);
      append_hydration(div4, div2);
      append_hydration(div2, div1);
      mount_component(dice, div1, null);
      append_hydration(div4, t2);
      append_hydration(div4, div3);
      append_hydration(div3, table);
      append_hydration(table, tbody);
      append_hydration(tbody, tr0);
      append_hydration(tr0, th0);
      append_hydration(tr0, t3);
      append_hydration(tr0, th1);
      append_hydration(th1, t4);
      append_hydration(tbody, t5);
      append_hydration(tbody, tr1);
      append_hydration(tr1, th2);
      append_hydration(th2, span0);
      append_hydration(span0, t6);
      append_hydration(th2, t7);
      append_hydration(th2, br0);
      append_hydration(th2, t8);
      append_hydration(th2, span1);
      append_hydration(span1, t9);
      append_hydration(tr1, t10);
      append_hydration(tr1, td0);
      append_hydration(td0, a0);
      append_hydration(a0, t11);
      append_hydration(tbody, t12);
      append_hydration(tbody, tr2);
      append_hydration(tr2, th3);
      append_hydration(th3, span2);
      append_hydration(span2, t13);
      append_hydration(th3, t14);
      append_hydration(th3, br1);
      append_hydration(th3, t15);
      append_hydration(th3, span3);
      append_hydration(span3, t16);
      append_hydration(tr2, t17);
      append_hydration(tr2, td1);
      append_hydration(td1, a1);
      append_hydration(a1, t18);
      append_hydration(tbody, t19);
      append_hydration(tbody, tr3);
      append_hydration(tr3, th4);
      append_hydration(th4, span4);
      append_hydration(span4, t20);
      append_hydration(th4, t21);
      append_hydration(th4, br2);
      append_hydration(th4, t22);
      append_hydration(th4, span5);
      append_hydration(span5, t23);
      append_hydration(tr3, t24);
      append_hydration(tr3, td2);
      append_hydration(td2, a2);
      append_hydration(a2, t25);
      append_hydration(tbody, t26);
      append_hydration(tbody, tr4);
      append_hydration(tr4, th5);
      append_hydration(th5, span6);
      append_hydration(span6, t27);
      append_hydration(th5, t28);
      append_hydration(th5, br3);
      append_hydration(th5, t29);
      append_hydration(th5, span7);
      append_hydration(span7, t30);
      append_hydration(tr4, t31);
      append_hydration(tr4, td3);
      append_hydration(td3, a3);
      append_hydration(a3, t32);
      append_hydration(tbody, t33);
      append_hydration(tbody, tr5);
      append_hydration(tr5, th6);
      append_hydration(th6, span8);
      append_hydration(span8, t34);
      append_hydration(th6, t35);
      append_hydration(th6, br4);
      append_hydration(th6, t36);
      append_hydration(th6, span9);
      append_hydration(span9, t37);
      append_hydration(tr5, t38);
      append_hydration(tr5, td4);
      append_hydration(td4, a4);
      append_hydration(a4, t39);
      append_hydration(tbody, t40);
      append_hydration(tbody, tr6);
      append_hydration(tr6, th7);
      append_hydration(th7, span10);
      append_hydration(span10, t41);
      append_hydration(th7, t42);
      append_hydration(th7, br5);
      append_hydration(th7, t43);
      append_hydration(th7, span11);
      append_hydration(span11, t44);
      append_hydration(tr6, t45);
      append_hydration(tr6, td5);
      append_hydration(td5, a5);
      append_hydration(a5, t46);
      append_hydration(tbody, t47);
      append_hydration(tbody, tr7);
      append_hydration(tr7, th8);
      append_hydration(th8, span12);
      append_hydration(span12, t48);
      append_hydration(th8, t49);
      append_hydration(th8, br6);
      append_hydration(th8, t50);
      append_hydration(th8, span13);
      append_hydration(span13, t51);
      append_hydration(tr7, t52);
      append_hydration(tr7, td6);
      if_block.m(td6, null);
      append_hydration(tbody, t53);
      append_hydration(tbody, tr8);
      append_hydration(tbody, t54);
      append_hydration(tbody, tr9);
      append_hydration(tr9, th9);
      append_hydration(th9, span14);
      append_hydration(span14, t55);
      append_hydration(th9, t56);
      append_hydration(th9, br7);
      append_hydration(th9, t57);
      append_hydration(th9, span15);
      append_hydration(span15, t58);
      append_hydration(tr9, t59);
      append_hydration(tr9, td7);
      append_hydration(td7, a6);
      append_hydration(a6, t60);
      append_hydration(tbody, t61);
      append_hydration(tbody, tr10);
      append_hydration(tr10, th10);
      append_hydration(th10, span16);
      append_hydration(span16, t62);
      append_hydration(th10, t63);
      append_hydration(th10, br8);
      append_hydration(th10, t64);
      append_hydration(th10, span17);
      append_hydration(span17, t65);
      append_hydration(tr10, t66);
      append_hydration(tr10, td8);
      append_hydration(td8, a7);
      append_hydration(a7, t67);
      append_hydration(tbody, t68);
      append_hydration(tbody, tr11);
      append_hydration(tr11, th11);
      append_hydration(th11, span18);
      append_hydration(span18, t69);
      append_hydration(th11, t70);
      append_hydration(th11, br9);
      append_hydration(th11, t71);
      append_hydration(th11, span19);
      append_hydration(span19, t72);
      append_hydration(tr11, t73);
      append_hydration(tr11, td9);
      append_hydration(td9, a8);
      append_hydration(a8, t74);
      append_hydration(tbody, t75);
      append_hydration(tbody, tr12);
      append_hydration(tr12, th12);
      append_hydration(th12, span20);
      append_hydration(span20, t76);
      append_hydration(th12, t77);
      append_hydration(th12, br10);
      append_hydration(th12, t78);
      append_hydration(th12, span21);
      append_hydration(span21, t79);
      append_hydration(tr12, t80);
      append_hydration(tr12, td10);
      append_hydration(td10, a9);
      append_hydration(a9, t81);
      append_hydration(tbody, t82);
      append_hydration(tbody, tr13);
      append_hydration(tr13, th13);
      append_hydration(th13, span22);
      append_hydration(span22, t83);
      append_hydration(th13, t84);
      append_hydration(th13, br11);
      append_hydration(th13, t85);
      append_hydration(th13, span23);
      append_hydration(span23, t86);
      append_hydration(tr13, t87);
      append_hydration(tr13, td11);
      append_hydration(td11, a10);
      append_hydration(a10, t88);
      append_hydration(tbody, t89);
      append_hydration(tbody, tr14);
      append_hydration(tr14, th14);
      append_hydration(th14, span24);
      append_hydration(span24, t90);
      append_hydration(th14, t91);
      append_hydration(th14, br12);
      append_hydration(th14, t92);
      append_hydration(th14, span25);
      append_hydration(span25, t93);
      append_hydration(tr14, t94);
      append_hydration(tr14, td12);
      append_hydration(td12, a11);
      append_hydration(a11, t95);
      append_hydration(tbody, t96);
      append_hydration(tbody, tr15);
      append_hydration(tr15, th15);
      append_hydration(th15, span26);
      append_hydration(span26, t97);
      append_hydration(th15, t98);
      append_hydration(th15, br13);
      append_hydration(th15, t99);
      append_hydration(th15, span27);
      append_hydration(span27, t100);
      append_hydration(tr15, t101);
      append_hydration(tr15, td13);
      append_hydration(td13, a12);
      append_hydration(a12, t102);
      append_hydration(tbody, t103);
      append_hydration(tbody, tr16);
      append_hydration(tr16, th16);
      append_hydration(th16, span28);
      append_hydration(span28, t104);
      append_hydration(tr16, t105);
      append_hydration(tr16, td14);
      append_hydration(td14, a13);
      append_hydration(a13, t106);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            a0,
            "click",
            /*click_handler*/
            ctx[6]
          ),
          listen(
            a1,
            "click",
            /*click_handler_1*/
            ctx[7]
          ),
          listen(
            a2,
            "click",
            /*click_handler_2*/
            ctx[8]
          ),
          listen(
            a3,
            "click",
            /*click_handler_3*/
            ctx[9]
          ),
          listen(
            a4,
            "click",
            /*click_handler_4*/
            ctx[10]
          ),
          listen(
            a5,
            "click",
            /*click_handler_5*/
            ctx[11]
          ),
          listen(
            a6,
            "click",
            /*click_handler_6*/
            ctx[12]
          ),
          listen(
            a7,
            "click",
            /*click_handler_7*/
            ctx[13]
          ),
          listen(
            a8,
            "click",
            /*click_handler_8*/
            ctx[14]
          ),
          listen(
            a9,
            "click",
            /*click_handler_9*/
            ctx[15]
          ),
          listen(
            a10,
            "click",
            /*click_handler_10*/
            ctx[16]
          ),
          listen(
            a11,
            "click",
            /*click_handler_11*/
            ctx[17]
          ),
          listen(
            a12,
            "click",
            /*click_handler_12*/
            ctx[18]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if ((!current || dirty & /*$HandsStore, $TempHandsStore*/
      3) && t11_value !== (t11_value = /*$HandsStore*/
      (ctx2[0].ONE.is_recorded ? (
        /*$HandsStore*/
        ctx2[0].ONE.recorded_points
      ) : (
        /*$TempHandsStore*/
        ctx2[1].ONE.points
      )) + ""))
        set_data(t11, t11_value);
      if (!current || dirty & /*$HandsStore*/
      1 && a0_class_value !== (a0_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx2[0].ONE.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6")) {
        attr(a0, "class", a0_class_value);
      }
      if ((!current || dirty & /*$HandsStore, $TempHandsStore*/
      3) && t18_value !== (t18_value = /*$HandsStore*/
      (ctx2[0].TWO.is_recorded ? (
        /*$HandsStore*/
        ctx2[0].TWO.recorded_points
      ) : (
        /*$TempHandsStore*/
        ctx2[1].TWO.points
      )) + ""))
        set_data(t18, t18_value);
      if (!current || dirty & /*$HandsStore*/
      1 && a1_class_value !== (a1_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx2[0].TWO.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6")) {
        attr(a1, "class", a1_class_value);
      }
      if ((!current || dirty & /*$HandsStore, $TempHandsStore*/
      3) && t25_value !== (t25_value = /*$HandsStore*/
      (ctx2[0].THREE.is_recorded ? (
        /*$HandsStore*/
        ctx2[0].THREE.recorded_points
      ) : (
        /*$TempHandsStore*/
        ctx2[1].THREE.points
      )) + ""))
        set_data(t25, t25_value);
      if (!current || dirty & /*$HandsStore*/
      1 && a2_class_value !== (a2_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx2[0].THREE.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6")) {
        attr(a2, "class", a2_class_value);
      }
      if ((!current || dirty & /*$HandsStore, $TempHandsStore*/
      3) && t32_value !== (t32_value = /*$HandsStore*/
      (ctx2[0].FOUR.is_recorded ? (
        /*$HandsStore*/
        ctx2[0].FOUR.recorded_points
      ) : (
        /*$TempHandsStore*/
        ctx2[1].FOUR.points
      )) + ""))
        set_data(t32, t32_value);
      if (!current || dirty & /*$HandsStore*/
      1 && a3_class_value !== (a3_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx2[0].FOUR.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6")) {
        attr(a3, "class", a3_class_value);
      }
      if ((!current || dirty & /*$HandsStore, $TempHandsStore*/
      3) && t39_value !== (t39_value = /*$HandsStore*/
      (ctx2[0].FIVE.is_recorded ? (
        /*$HandsStore*/
        ctx2[0].FIVE.recorded_points
      ) : (
        /*$TempHandsStore*/
        ctx2[1].FIVE.points
      )) + ""))
        set_data(t39, t39_value);
      if (!current || dirty & /*$HandsStore*/
      1 && a4_class_value !== (a4_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx2[0].FIVE.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6")) {
        attr(a4, "class", a4_class_value);
      }
      if ((!current || dirty & /*$HandsStore, $TempHandsStore*/
      3) && t46_value !== (t46_value = /*$HandsStore*/
      (ctx2[0].SIX.is_recorded ? (
        /*$HandsStore*/
        ctx2[0].SIX.recorded_points
      ) : (
        /*$TempHandsStore*/
        ctx2[1].SIX.points
      )) + ""))
        set_data(t46, t46_value);
      if (!current || dirty & /*$HandsStore*/
      1 && a5_class_value !== (a5_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx2[0].SIX.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6")) {
        attr(a5, "class", a5_class_value);
      }
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(td6, null);
        }
      }
      if ((!current || dirty & /*$HandsStore, $TempHandsStore*/
      3) && t60_value !== (t60_value = /*$HandsStore*/
      (ctx2[0].THREE_CARD.is_recorded ? (
        /*$HandsStore*/
        ctx2[0].THREE_CARD.recorded_points
      ) : (
        /*$TempHandsStore*/
        ctx2[1].THREE_CARD.points
      )) + ""))
        set_data(t60, t60_value);
      if (!current || dirty & /*$HandsStore*/
      1 && a6_class_value !== (a6_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx2[0].THREE_CARD.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6")) {
        attr(a6, "class", a6_class_value);
      }
      if ((!current || dirty & /*$HandsStore, $TempHandsStore*/
      3) && t67_value !== (t67_value = /*$HandsStore*/
      (ctx2[0].FOUR_CARD.is_recorded ? (
        /*$HandsStore*/
        ctx2[0].FOUR_CARD.recorded_points
      ) : (
        /*$TempHandsStore*/
        ctx2[1].FOUR_CARD.points
      )) + ""))
        set_data(t67, t67_value);
      if (!current || dirty & /*$HandsStore*/
      1 && a7_class_value !== (a7_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx2[0].FOUR_CARD.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6")) {
        attr(a7, "class", a7_class_value);
      }
      if ((!current || dirty & /*$HandsStore, $TempHandsStore*/
      3) && t74_value !== (t74_value = /*$HandsStore*/
      (ctx2[0].FULL_HOUSE.is_recorded ? (
        /*$HandsStore*/
        ctx2[0].FULL_HOUSE.recorded_points
      ) : (
        /*$TempHandsStore*/
        ctx2[1].FULL_HOUSE.points
      )) + ""))
        set_data(t74, t74_value);
      if (!current || dirty & /*$HandsStore*/
      1 && a8_class_value !== (a8_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx2[0].FULL_HOUSE.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6")) {
        attr(a8, "class", a8_class_value);
      }
      if ((!current || dirty & /*$HandsStore, $TempHandsStore*/
      3) && t81_value !== (t81_value = /*$HandsStore*/
      (ctx2[0].SMALL_STRAIGHT.is_recorded ? (
        /*$HandsStore*/
        ctx2[0].SMALL_STRAIGHT.recorded_points
      ) : (
        /*$TempHandsStore*/
        ctx2[1].SMALL_STRAIGHT.points
      )) + ""))
        set_data(t81, t81_value);
      if (!current || dirty & /*$HandsStore*/
      1 && a9_class_value !== (a9_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx2[0].SMALL_STRAIGHT.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6")) {
        attr(a9, "class", a9_class_value);
      }
      if ((!current || dirty & /*$HandsStore, $TempHandsStore*/
      3) && t88_value !== (t88_value = /*$HandsStore*/
      (ctx2[0].BIG_STRAIGHT.is_recorded ? (
        /*$HandsStore*/
        ctx2[0].BIG_STRAIGHT.recorded_points
      ) : (
        /*$TempHandsStore*/
        ctx2[1].BIG_STRAIGHT.points
      )) + ""))
        set_data(t88, t88_value);
      if (!current || dirty & /*$HandsStore*/
      1 && a10_class_value !== (a10_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx2[0].BIG_STRAIGHT.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6")) {
        attr(a10, "class", a10_class_value);
      }
      if ((!current || dirty & /*$HandsStore, $TempHandsStore*/
      3) && t95_value !== (t95_value = /*$HandsStore*/
      (ctx2[0].YAHTZEE.is_recorded ? (
        /*$HandsStore*/
        ctx2[0].YAHTZEE.recorded_points
      ) : (
        /*$TempHandsStore*/
        ctx2[1].YAHTZEE.points
      )) + ""))
        set_data(t95, t95_value);
      if (!current || dirty & /*$HandsStore*/
      1 && a11_class_value !== (a11_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx2[0].YAHTZEE.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6")) {
        attr(a11, "class", a11_class_value);
      }
      if ((!current || dirty & /*$HandsStore, $TempHandsStore*/
      3) && t102_value !== (t102_value = /*$HandsStore*/
      (ctx2[0].CHANCE.is_recorded ? (
        /*$HandsStore*/
        ctx2[0].CHANCE.recorded_points
      ) : (
        /*$TempHandsStore*/
        ctx2[1].CHANCE.points
      )) + ""))
        set_data(t102, t102_value);
      if (!current || dirty & /*$HandsStore*/
      1 && a12_class_value !== (a12_class_value = "point-cell-event-handler " + /*$HandsStore*/
      (ctx2[0].CHANCE.is_recorded ? "recorded" : "not-recorded") + " svelte-1q9llg6")) {
        attr(a12, "class", a12_class_value);
      }
      if (!current || dirty & /*sumOfPoints*/
      4)
        set_data(
          t106,
          /*sumOfPoints*/
          ctx2[2]
        );
    },
    i(local) {
      if (current)
        return;
      transition_in(dice.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(dice.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div4);
      destroy_component(dice);
      if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
const BONUS_THRESHOLD = 63;
function instance($$self, $$props, $$invalidate) {
  let $HandsStore;
  let $TempHandsStore;
  let $DiceStore;
  component_subscribe($$self, hands, ($$value) => $$invalidate(0, $HandsStore = $$value));
  component_subscribe($$self, tempHands, ($$value) => $$invalidate(1, $TempHandsStore = $$value));
  component_subscribe($$self, dices, ($$value) => $$invalidate(5, $DiceStore = $$value));
  const DICE_FACES = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6
  };
  const BIG_STRAIGHT_PATTERNS = [[1, 2, 3, 4, 5], [2, 3, 4, 5, 6]];
  const SMALL_STRAIGHT_PATTERNS = [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]];
  let sumOfPoints = 0;
  let toGetBonus = BONUS_THRESHOLD;
  function resetAllTempHands() {
    Object.keys($TempHandsStore).forEach((tempHand) => {
      set_store_value(tempHands, $TempHandsStore[tempHand].points = 0, $TempHandsStore);
    });
  }
  function detectHands(dices2, tempHandsStore) {
    const sortedAllDices = Array.from(dices2).sort((a, b) => {
      return a - b;
    });
    const dicesSet = new Set(Array.from(sortedAllDices).map((dice) => dice));
    const diceFaceCountArray = [];
    dicesSet.forEach((dice) => {
      diceFaceCountArray[dice] = sortedAllDices.filter((sortedAllDice) => sortedAllDice === dice).length;
    });
    let sumOfAllDice = 0;
    Object.keys(DICE_FACES).forEach((face) => {
      const sumOfDiceFace = calculateSumOfDiceFace(dices2, DICE_FACES[face]);
      tempHandsStore[face].points = sumOfDiceFace;
      sumOfAllDice += sumOfDiceFace;
    });
    tempHandsStore["CHANCE"].points = sumOfAllDice;
    if (dicesSet.size === 1) {
      tempHandsStore["THREE_CARD"].points = sumOfAllDice;
      tempHandsStore["FOUR_CARD"].points = sumOfAllDice;
      tempHandsStore["FULL_HOUSE"].points = 25;
      tempHandsStore["SMALL_STRAIGHT"].points = 30;
      tempHandsStore["BIG_STRAIGHT"].points = 40;
      tempHandsStore["YAHTZEE"].points = 50;
    }
    if (!tempHandsStore["THREE_CARD"].points && calculateMax(diceFaceCountArray) >= 3) {
      tempHandsStore["THREE_CARD"].points = sumOfAllDice;
    }
    if (!tempHandsStore["FOUR_CARD"].points && calculateMax(diceFaceCountArray) >= 4) {
      tempHandsStore["FOUR_CARD"].points = sumOfAllDice;
    }
    if (!tempHandsStore["FULL_HOUSE"].points) {
      if (calculateMin(diceFaceCountArray) === 2 && calculateMax(diceFaceCountArray) === 3) {
        tempHandsStore["FULL_HOUSE"].points = 25;
      }
    }
    if (!tempHandsStore["BIG_STRAIGHT"].points) {
      BIG_STRAIGHT_PATTERNS.some((BIG_STRAIGHT_PATTERN) => {
        if (JSON.stringify(BIG_STRAIGHT_PATTERN) === JSON.stringify(Array.from(dicesSet))) {
          tempHandsStore["SMALL_STRAIGHT"].points = 30;
          tempHandsStore["BIG_STRAIGHT"].points = 40;
          return true;
        }
        return false;
      });
    }
    if (!tempHandsStore["SMALL_STRAIGHT"].points) {
      SMALL_STRAIGHT_PATTERNS.some((SMALL_STRAIGHT_PATTERN) => {
        if (Array.from(dicesSet).join("").includes(SMALL_STRAIGHT_PATTERN.join(""))) {
          tempHandsStore["SMALL_STRAIGHT"].points = 30;
          return true;
        }
        return false;
      });
    }
    set_store_value(tempHands, $TempHandsStore = tempHandsStore, $TempHandsStore);
  }
  const calculateSumOfDiceFace = (dices2, roll) => {
    return roll * dices2.filter((dice) => dice === roll).length;
  };
  const calculateMax = (numberArray) => {
    return numberArray.reduce((a, b) => Math.max(a, b));
  };
  const calculateMin = (numberArray) => {
    return numberArray.reduce((a, b) => Math.min(a, b));
  };
  const recordPoints = (handsKey) => {
    if ($HandsStore[handsKey].is_recorded) {
      alert("この役は記録済みです。");
      return;
    }
    const willRecordPoints = $TempHandsStore[handsKey].points;
    set_store_value(hands, $HandsStore[handsKey].recorded_points = willRecordPoints, $HandsStore);
    set_store_value(hands, $HandsStore[handsKey].is_recorded = true, $HandsStore);
    if (getOneToSixSum() >= BONUS_THRESHOLD) {
      set_store_value(hands, $HandsStore["BONUS"].recorded_points = 35, $HandsStore);
      set_store_value(hands, $HandsStore["BONUS"].is_recorded = true, $HandsStore);
    }
  };
  const getOneToSixSum = () => {
    let sum = 0;
    Object.keys(DICE_FACES).forEach((face) => {
      sum += $HandsStore[face].recorded_points;
    });
    return sum;
  };
  const getPointsToGetBonus = () => {
    const oneToSixSum = getOneToSixSum();
    return BONUS_THRESHOLD - oneToSixSum;
  };
  const getSumOfPoints = (HandsStore) => {
    const sum = Object.keys(HandsStore).reduce((sum2, hand) => sum2 + parseInt(HandsStore[hand].recorded_points || 0), 0);
    return sum;
  };
  const click_handler = () => recordPoints("ONE");
  const click_handler_1 = () => recordPoints("TWO");
  const click_handler_2 = () => recordPoints("THREE");
  const click_handler_3 = () => recordPoints("FOUR");
  const click_handler_4 = () => recordPoints("FIVE");
  const click_handler_5 = () => recordPoints("SIX");
  const click_handler_6 = () => recordPoints("THREE_CARD");
  const click_handler_7 = () => recordPoints("FOUR_CARD");
  const click_handler_8 = () => recordPoints("FULL_HOUSE");
  const click_handler_9 = () => recordPoints("SMALL_STRAIGHT");
  const click_handler_10 = () => recordPoints("BIG_STRAIGHT");
  const click_handler_11 = () => recordPoints("YAHTZEE");
  const click_handler_12 = () => recordPoints("CHANCE");
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$DiceStore, $TempHandsStore*/
    34) {
      {
        resetAllTempHands();
        detectHands($DiceStore, $TempHandsStore);
      }
    }
    if ($$self.$$.dirty & /*$HandsStore*/
    1) {
      {
        $$invalidate(2, sumOfPoints = getSumOfPoints($HandsStore));
        $$invalidate(3, toGetBonus = getPointsToGetBonus());
      }
    }
  };
  return [
    $HandsStore,
    $TempHandsStore,
    sumOfPoints,
    toGetBonus,
    recordPoints,
    $DiceStore,
    click_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3,
    click_handler_4,
    click_handler_5,
    click_handler_6,
    click_handler_7,
    click_handler_8,
    click_handler_9,
    click_handler_10,
    click_handler_11,
    click_handler_12
  ];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export {
  Page as default
};
