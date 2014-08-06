#pragma once
#include "zakengine/zak.h"
#include "Ball.h"
#include "Pad.h"
#include "Brick.h"

const int BRICKS_PER_SIDE =	10;
const int BRICKS_FILES =	6;
const int START_POS_X =		-250;
const int START_POS_Y =		280;
const int SPACE_BETWEEN_X =	7;
const int SPACE_BETWEEN_Y =	5;

using namespace zak;

class ArkadiuM : public Game {
public:
	bool OnInit();
	void OnFrame();
	void OnDraw();
	bool OnShutdown();

	ArkadiuM();
	~ArkadiuM();

private:
	bool CheckCollision(Entity2D &entity1, Entity2D &entity2);
	
	Ball	 _ball;
	Pad		 _pad;
	Brick	 _bricks[BRICKS_PER_SIDE*BRICKS_FILES];
};