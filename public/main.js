function click(id,handler) {
    get_element(id).addEventListener("click",handler)
}

function get_element(id){
    return document.getElementById(id)
}

function log(msg){
    console.log(msg);
}

function generate(text) {
    var texts = generate_texts(text);
    var element_result = get_element("result");
    var item_text = "";
    for (var i = 0; i < texts.length; i++) {
        var item = texts[i];
        var position = i + 1;
        item_text = item_text + position + ". " + item + "\n";
    }
    element_result.value = item_text;
    element_result.style.display = "inline";
}

function generate_texts(text) {
    console.log(text);
    var pattern = /({[^\}]+})/gi;
    var result = text.match(pattern);
    var length = get_the_longest_word(result);
    var data = [];

    for (var i = 0; i < length; i++) {
        var result_text = text;
        result.forEach(function(item_result) {
            result_text = result_text.replace(item_result, "$");
            var item_result_split = item_result.split("|")
            var item = item_result_split[i];
            // var item_text = item_result_split.shift();

            // let items = item_result_split;
            var item_text = get_rand_array(item_result_split);//items[Math.floor(Math.random()*items.length)];

            if (item) {
                item_text = item;
            }

            item_text = item_text.replace("{", "").replace("}", "");
            result_text = result_text.replace("$", item_text);
        })

        data.push(result_text);
    }

    return data;
}

function get_the_longest_word(array) {
    var length = 0;
    for (var i = 0; i < array.length; i++) {
        var inside_array = array[i].split("|")
        if (length < inside_array.length) {
            length = inside_array.length;
        }
    }
    return length;
}

function get_rand_array(items) {
    return items[Math.floor(Math.random()*items.length)];
}

function generate_advance() {
    let prefix = get_element("text-prefix").value.split(",");
    let spintax = generate_texts(get_element("text-spintax").value);
    let suffix = get_element("text-suffix").value.split("\n");

    let start = get_rand_array(prefix);
    let middle = get_rand_array(spintax);
    let end = get_rand_array(suffix);

    get_element("result-prefix").value = start + " " + middle + " " + end;
}

click("generate", function() {
    var text = get_element("text").value;
    get_element("generate-example").innerHTML = "Generate Example";
    if (text) {
        generate(text);
    }
})

click("generate-example", function() {
    var label = get_element("generate-example").innerHTML;
    var label_default = "Generate Example";
    if (label == label_default) {
        get_element("generate-example").innerHTML = "Clear";
        var text = "{Aku|Saya|Gue} {bangga|bahagia|bersyukur} {lahir|dilahirkan} di {Indonesia|negeri ini}.";
        get_element("text").value = text;
        generate(text);
    }else{
        get_element("generate-example").innerHTML = label_default;
        get_element("text").value = "";
        get_element("result").style.display = "none";
    }
})

click("generate-prefix", function() {
    get_element("generate-prefix-example").innerHTML = "Clear";
    generate_advance();
})


click("generate-prefix-example", function() {
    var label = get_element("generate-prefix-example").innerHTML;
    var label_default = "Generate Example";
    if (label == label_default) {
        get_element("generate-prefix-example").innerHTML = "Clear";
        get_element("text-prefix").value = "Ini string, contoh string, string ok";
        get_element("text-spintax").value = "{aku|sayang|gue} {anak|orang} {nusantara|indonesia}";
        get_element("text-suffix").value = "Ini string\ncontoh string\nstring ok";

        generate_advance();

    }else{
        get_element("generate-prefix-example").innerHTML = label_default;
        get_element("text-prefix").value = "";
        get_element("text-spintax").value = "";
        get_element("text-suffix").value = "";
    }
})


