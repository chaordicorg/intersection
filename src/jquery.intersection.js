(function($){

	$.fn.intersection = function(options) {

		/*
			"rootMargin": "0px 0px -100% 0px",	//一番上(上右下左)
			"rootMargin": "0px 0px -90% 0px",	//一番上から10%に達した時(上右下左)
			"rootMargin": "0px",				//一番下
			"rootMargin": "-50%",				// 天地の中心

			※「値が0でもpxか％が必要」

			オプションはココを参照
			https://blog.jxck.io/entries/2016-06-25/intersection-observer.html
		*/

		var _opt = $.extend({
			"root": null,			 	// ルートの要素（nullでビューポイント）
			"rootMargin": "-50% 0px",	// ルートの重なり判定領域(上右下左)
			"threshold": 0,				// 閾値(0で0%/1で100%、つまりrootと全身が重なったら)
			"target": ".box",
			callback: function(_dom){
				console.log(_dom);
			}
		}, options);



		/*
		 * main
		 */
		return this.each(function(){

			const Intersect = function(entries) {

				// 交差検知をしたもののなかで、
				// isIntersectingがtrueのDOMを渡す
				for (var i=0; i < entries.length; i++){
					if (entries[i].isIntersecting) {
						_opt.callback(entries[i].target);
					}
				}
			}

			const _boxes = document.querySelectorAll(_opt.target);

			const _options = {
				root: _opt.root,
				rootMargin: _opt.rootMargin,
				threshold: _opt.threshold
			};

			const observer = new IntersectionObserver(
				Intersect,
				_options
			);

			for (var i=0; i < _boxes.length; i++){
				observer.observe(_boxes[i]);
			}

		});


	};

})(jQuery);