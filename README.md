# CPU Scheduling Algorithms Calculator

This a project that uses multiple React components in order to make a calculator for some CPU Scheduling Algorithms.

### The scheduling algorithms chosen were the following
First in, first out (FIFO), also known as first come, first served (FCFS), is the simplest scheduling algorithm. FIFO simply queues processes in the order that they arrive in the ready queue. In this, the process that comes first will be executed first and next process starts only after the previous gets fully executed.

Shortest Job First (SJf) scheduling is a scheduling policy that selects the waiting process with the smallest execution time to execute next.

Round Robin is a CPU scheduling algorithm where each process is assigned a fixed time slot in a cyclic way.

In the Shortest Remaining Time First (SRTF) scheduling algorithm, the process with the smallest amount of time remaining until completion is selected to execute. Since the currently executing process is the one with the shortest amount of time remaining by definition, and since that time should only reduce as execution progresses, processes will always run until they complete or a new process is added that requires a smaller amount of time.

### Why did I choose these specific algorithms?
These ones are the ones I understand the most in terms of functionality. Their formulas are also a little easier to understand than the others.

### Why did I choose this kind of project?
I took a class a while back and we had to research some of these algorithms and how they were programmed in java. Now I wanted to see how far I can take them in React using different components and actually displaying the calculator on an actual website. 

#Goal
The goal is to make a calculator for each of the algorithms (maybe have them in different pages). The user can enter the proccess name and the waiting time. Then a table with the answers will be displayed on the side telling the user the reults.

If you want to read more about CPU scheduling and how they work (this includes formulas) you can visit https://www.tutorialspoint.com/operating_system/os_process_scheduling_algorithms.htm for more info.