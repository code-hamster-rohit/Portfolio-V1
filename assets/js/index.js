function getHandle(className) {
    return document.querySelector('.' + className);

}
function handleMouseMove(event) {
    const { clientX, clientY } = event;
    spotlightEl.style.background = `radial-gradient(circle at ${clientX}px ${clientY}px, #00000000 10px, #000000ee 350px)`;
}

var typed = new Typed('#element', {
    strings: ['&lt;&nbsp;Developer&nbsp;/&gt;', 'Humble Human :)'],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true,
    showCursor: true,
});

const spotlightEl = document.querySelector("#spotlight");
document.addEventListener("mousemove", handleMouseMove);

const nonScrollable = getHandle("header-navigation");
const scrollable = getHandle("body-content");
nonScrollable.addEventListener("wheel", function (e) {
    e.preventDefault();
    scrollable.scrollTop += e.deltaY;
});

$(function () {
    
    $('#container').highcharts({

        accessibility: {
            enabled: false,
        },
        
	    chart: {
	        polar: true,
	        type: 'line',
            backgroundColor: 'transparent',
	    },
	    credits: {
			enabled: false
		},
	    title: {
	        text: ''
	    },
	    
	    pane: {
	        startAngle: 0,
	        endAngle: 360
	    },
	
	    xAxis: {
	    	type: 'category',
	        tickInterval: 1,
	        categories: ['Python', 'Dart', 'C++', 'C', 'HTML', 'CSS', 'JavaScript', 'PHP'],
	        min: 0,
	        max: 8,
	        tickmarkPlacement: 'on',
	        lineWidth: 0,
	        labels: {
                style: {
                    color: '#94a3b8',
                    fontSize: '16px',
                    fontFamily: 'ubuntu-regular, sans-serif',
                },
	        	formatter: function () {
        			return this.value
	        	}
	        },

	    },
	     tooltip: {
            shared: true,
            useHTML: true,
            headerFormat: '<div class="newTip"><span>{point.key}</span>' + '<br/>',
            pointFormat: '{point.y} / 5.0',
            footerFormat: '</div>',
            valueDecimals: 1,
            backgroundColor: '#e2e8e0',
        },
	    yAxis: {
          gridLineInterpolation: 'polygon',
	        min: 0,
	        max: 5,
	        tickInterval: 1,
			minorTickInterval: 0.5,
			showLastLabel: 'true',
			labels:{
					x: 8,
				style: {
					color: '#94a3b8',
					display: "inline-block"
					}				
			},
			
	    },
	    
	    plotOptions: {
	        series: {
	            pointStart: 0,
	            pointInterval: 1,
                color: 'rgba(15,23,42,255)',
                lineColor: '#94a3b8',
                marker: {
                    lineWidth: 2,
                    lineColor: '#5eead4',
                }

	        },
	        column: {
	            pointPadding: 0,
	            groupPadding: 0
	        }
	    },
        legend: {
            itemStyle: {
                color: '#e2e8e0',
                fontWeight: 'bold'
            }
        },
	    series: [{
	        type: 'area',
	        name: 'Skills',
	        data: [4.5, 3.5, 4, 4, 4.5, 4, 4.5, 3.5],
	        pointPlacement: "on",
	    }]
	});
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var fromEmail = document.getElementById('fromEmail').value;
    var subject = document.getElementById('subject').value;
    var body = document.getElementById('body').value;

    var mailtoLink = 'mailto:rohitkumar.patna1008@gmail.com' +
                     '?subject=' + encodeURIComponent(subject) +
                     '&body=' + encodeURIComponent(body) +
                     '%0D%0A%0D%0AFrom: ' + encodeURIComponent(fromEmail);

    window.location.href = mailtoLink;
});

document.addEventListener("DOMContentLoaded", function() {
    const bodyContent = document.querySelector(".body-content");
    const topOffset = 80;
    const bottomOffset = 260;
    const sections = {
        '#EDUCATION': document.querySelector('.education-wrapper'),
        '#SKILLS': document.querySelector('.skills-wrapper'),
        '#PROJECTS': document.querySelector('.projects-wrapper'),
        '#CONTACT': document.querySelector('.contact-wrapper')
    };

    const navLinks = document.querySelectorAll(".navigation .nav-subdivision");

    const removeActiveClass = () => {
        navLinks.forEach(link => {
        link.classList.remove("active");
        });
    };

    const addActiveClass = (section) => {
        removeActiveClass();
        const activeLink = document.querySelector(`.navigation .nav-subdivision a[href="${section}"]`).parentElement;
        if (activeLink) {
        activeLink.classList.add("active");
        }
    };

    const scrollToSection = (section) => {
        const element = sections[section];
        const elementPosition = element.offsetTop;
        let offsetPosition;

        if (section === '#CONTACT') {
        const elementBottomPosition = element.offsetTop + element.offsetHeight;
        offsetPosition = elementBottomPosition - bodyContent.clientHeight + bottomOffset;
        if (offsetPosition < 0) offsetPosition = 0;
        } else {
        offsetPosition = elementPosition - topOffset;
        }

        bodyContent.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
        });

        addActiveClass(section);
    };

    navLinks.forEach(anchor => {
        anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetSection = this.querySelector('a').getAttribute("href");
        scrollToSection(targetSection);
        });
    });

    const handleScroll = () => {
        const currentScroll = bodyContent.scrollTop;
        let closestSection = null;
        let minDistance = Infinity;
        
        Object.keys(sections).forEach(section => {
            const element = sections[section];
            const elementPosition = element.offsetTop - topOffset;
            const distance = Math.abs(currentScroll - elementPosition);
        
            if (distance < minDistance) {
            closestSection = section;
            minDistance = distance;
            }
        });
        
        if (closestSection) {
            addActiveClass(closestSection);
        }
        };      
        handleScroll();
    bodyContent.addEventListener('scroll', handleScroll);
});
  