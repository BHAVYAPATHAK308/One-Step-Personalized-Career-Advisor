const initCharts = () => {
    // Check if Chart is loaded
    if (typeof Chart === 'undefined') return;

    // Set defaults for dark theme
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

    // Radar Chart: Skill Analysis
    const skillCtx = document.getElementById('skillRadarChart');
    if (skillCtx) {
        new Chart(skillCtx, {
            type: 'radar',
            data: {
                labels: ['Problem Solving', 'Communication', 'Technical', 'Leadership', 'Creativity', 'Teamwork'],
                datasets: [{
                    label: 'Your Current Skills',
                    data: [80, 70, 60, 85, 90, 75],
                    fill: true,
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgb(59, 130, 246)',
                    pointBackgroundColor: 'rgb(59, 130, 246)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(59, 130, 246)'
                }, {
                    label: 'Target Career (Software Engineer)',
                    data: [90, 80, 95, 70, 75, 85],
                    fill: true,
                    backgroundColor: 'rgba(139, 92, 246, 0.2)',
                    borderColor: 'rgb(139, 92, 246)',
                    pointBackgroundColor: 'rgb(139, 92, 246)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(139, 92, 246)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#f8fafc', font: { size: 12 } },
                        ticks: { display: false, max: 100, min: 0 }
                    }
                },
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#f8fafc' } }
                }
            }
        });
    }

    // Pie Chart: Career Compatibility
    const careerCtx = document.getElementById('careerMatchChart');
    if (careerCtx) {
        new Chart(careerCtx, {
            type: 'doughnut',
            data: {
                labels: ['Software Engineering', 'Data Science', 'Product Management', 'UI/UX Design'],
                datasets: [{
                    data: [85, 65, 45, 30],
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(139, 92, 246, 0.8)'
                    ],
                    borderColor: '#0f172a',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { position: 'right', labels: { color: '#f8fafc' } }
                }
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', initCharts);
